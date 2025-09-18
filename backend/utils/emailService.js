const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Fill template with data
const fillTemplate = (template, data) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
};

// Get default template by type and organization
const getDefaultTemplate = async (type, organizationId) => {
  const template = await EmailTemplate.findOne({
    type,
    organization: organizationId,
    isDefault: true
  });

  if (!template) {
    throw new Error(`No default template found for type: ${type}`);
  }

  return template;
};

// Send email using template
exports.sendTemplatedEmail = async ({
  to,
  templateId,
  templateType,
  organizationId,
  data
}) => {
  try {
    // Get template (either by ID or default)
    const template = templateId
      ? await EmailTemplate.findById(templateId)
      : await getDefaultTemplate(templateType, organizationId);

    if (!template) {
      throw new Error('Email template not found');
    }

    // Fill template with data
    const subject = fillTemplate(template.subject, data);
    const html = fillTemplate(template.body, data);

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html
    });

    return info;
  } catch (err) {
    console.error('Error sending templated email:', err);
    throw err;
  }
};

// Verify transporter connection
exports.verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (err) {
    console.error('Email service error:', err);
    return false;
  }
};