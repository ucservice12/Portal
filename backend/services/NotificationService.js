const Queue = require("bull");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const NotificationLog = require("../models/NotificationLog");
const EmailTemplate = require("../models/EmailTemplate");

// Initialize notification queue with Redis configuration
const notificationQueue = new Queue("notification processing", {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    maxRetriesPerRequest: null,
  },
});

// Email transporter - Fixed the method name
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Twilio client - Add error handling for missing credentials
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

class NotificationService {
  // Add notification to queue
  static async queueNotification(notificationData) {
    try {
      const job = await notificationQueue.add(
        "send-notification",
        notificationData,
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 2000,
          },
          removeOnComplete: 100,
          removeOnFail: 50,
        }
      );

      console.log(`Notification queued with job ID: ${job.id}`);
      return job;
    } catch (error) {
      console.error("Error queueing notification:", error);
      throw error;
    }
  }

  // Send email notification
  static async sendEmail({
    to,
    subject,
    html,
    templateId,
    templateData,
    organizationId,
    metadata,
  }) {
    try {
      let emailContent = { subject, html };
      let notificationLog;

      // Use template if provided
      if (templateId || templateData?.type) {
        const template = templateId
          ? await EmailTemplate.findById(templateId)
          : await EmailTemplate.findOne({
              organization: organizationId,
              type: templateData.type,
              isDefault: true,
            });

        if (template) {
          emailContent.subject = this.fillTemplate(
            template.subject,
            templateData
          );
          emailContent.html = this.fillTemplate(template.body, templateData);
        }
      }

      // Create notification log
      notificationLog = await NotificationLog.create({
        organization: organizationId,
        type: "email",
        channel: "nodemailer",
        recipient: to,
        subject: emailContent.subject,
        message: emailContent.html,
        templateId,
        metadata,
        status: "pending",
      });

      // Send email
      const info = await emailTransporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      // Update notification log
      await NotificationLog.findByIdAndUpdate(notificationLog._id, {
        status: "sent",
        sentAt: new Date(),
        externalId: info.messageId,
      });

      console.log("Email sent successfully:", info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        logId: notificationLog._id,
      };
    } catch (error) {
      console.error("Error sending email:", error);

      // Update notification log with error
      if (notificationLog) {
        await NotificationLog.findByIdAndUpdate(notificationLog._id, {
          status: "failed",
          failedAt: new Date(),
          errorMessage: error.message,
        });
      }

      throw error;
    }
  }

  // Send SMS notification
  static async sendSMS({ to, message, organizationId, metadata }) {
    try {
      if (!twilioClient) {
        throw new Error("Twilio credentials not configured");
      }

      let notificationLog;

      // Create notification log
      notificationLog = await NotificationLog.create({
        organization: organizationId,
        type: "sms",
        channel: "twilio",
        recipient: to,
        message,
        metadata,
        status: "pending",
      });

      // Send SMS
      const sms = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });

      // Update notification log
      await NotificationLog.findByIdAndUpdate(notificationLog._id, {
        status: "sent",
        sentAt: new Date(),
        externalId: sms.sid,
      });

      console.log("SMS sent successfully:", sms.sid);
      return { success: true, sid: sms.sid, logId: notificationLog._id };
    } catch (error) {
      console.error("Error sending SMS:", error);

      // Update notification log with error
      if (notificationLog) {
        await NotificationLog.findByIdAndUpdate(notificationLog._id, {
          status: "failed",
          failedAt: new Date(),
          errorMessage: error.message,
        });
      }

      throw error;
    }
  }

  // Send WhatsApp notification
  static async sendWhatsApp({ to, message, organizationId, metadata }) {
    try {
      if (!twilioClient) {
        throw new Error("Twilio credentials not configured");
      }

      let notificationLog;

      // Create notification log
      notificationLog = await NotificationLog.create({
        organization: organizationId,
        type: "sms",
        channel: "twilio",
        recipient: to,
        message,
        metadata,
        status: "pending",
      });

      // Send WhatsApp message
      const whatsapp = await twilioClient.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${to}`,
      });

      // Update notification log
      await NotificationLog.findByIdAndUpdate(notificationLog._id, {
        status: "sent",
        sentAt: new Date(),
        externalId: whatsapp.sid,
      });

      console.log("WhatsApp sent successfully:", whatsapp.sid);
      return { success: true, sid: whatsapp.sid, logId: notificationLog._id };
    } catch (error) {
      console.error("Error sending WhatsApp:", error);

      // Update notification log with error
      if (notificationLog) {
        await NotificationLog.findByIdAndUpdate(notificationLog._id, {
          status: "failed",
          failedAt: new Date(),
          errorMessage: error.message,
        });
      }

      throw error;
    }
  }

  // Fill template with data
  static fillTemplate(template, data) {
    if (!template || !data) return template;

    return template.replace(/{{(.*?)}}/g, (match, key) => {
      const value = data[key.trim()];
      return value !== undefined ? value : match;
    });
  }

  // Get notification statistics
  static async getNotificationStats(organizationId, dateRange = {}) {
    const matchQuery = { organization: organizationId };

    if (dateRange.start && dateRange.end) {
      matchQuery.createdAt = {
        $gte: new Date(dateRange.start),
        $lte: new Date(dateRange.end),
      };
    }

    const stats = await NotificationLog.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            type: "$type",
            status: "$status",
          },
          count: { $sum: 1 },
          totalCost: { $sum: "$cost" },
        },
      },
      {
        $group: {
          _id: "$_id.type",
          statuses: {
            $push: {
              status: "$_id.status",
              count: "$count",
              cost: "$totalCost",
            },
          },
          totalCount: { $sum: "$count" },
          totalCost: { $sum: "$totalCost" },
        },
      },
    ]);

    return stats;
  }
}

// Process notification queue
notificationQueue.process("send-notification", async (job) => {
  const { type, data } = job.data;

  try {
    switch (type) {
      case "email":
        return await NotificationService.sendEmail(data);
      case "sms":
        return await NotificationService.sendSMS(data);
      case "whatsapp":
        return await NotificationService.sendWhatsApp(data);
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  } catch (error) {
    console.error(`Failed to process notification job ${job.id}:`, error);
    throw error;
  }
});

// Queue event listeners
notificationQueue.on("completed", (job, result) => {
  console.log(`Notification job ${job.id} completed successfully`);
});

notificationQueue.on("failed", (job, err) => {
  console.error(`Notification job ${job.id} failed:`, err.message);
});

module.exports = NotificationService;
