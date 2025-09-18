const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const NotificationService = require('../services/NotificationService');
const NotificationLog = require('../models/NotificationLog');

// @desc    Get notification logs
// @route   GET /api/v1/notifications
// @access  Private/Admin
router.get('/', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;

    let query = { organization: req.user.organization };

    // Add filters
    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.recipient) {
      query.recipient = new RegExp(req.query.recipient, 'i');
    }

    const total = await NotificationLog.countDocuments(query);
    const notifications = await NotificationLog.find(query)
      .populate('metadata.userId', 'firstName lastName email')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    const pagination = {};
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: notifications.length,
      total,
      pagination,
      data: notifications
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Send notification manually
// @route   POST /api/v1/notifications/send
// @access  Private/Admin
router.post('/send', protect, authorize('admin'), async (req, res) => {
  try {
    const { type, recipients, subject, message, templateId } = req.body;

    if (!type || !recipients || !message) {
      return res.status(400).json({
        success: false,
        error: 'Type, recipients, and message are required'
      });
    }

    const results = [];

    for (const recipient of recipients) {
      try {
        const job = await NotificationService.queueNotification({
          type,
          data: {
            to: recipient,
            subject: subject || 'Notification',
            html: message,
            templateId,
            organizationId: req.user.organization,
            metadata: {
              userId: req.user.id,
              relatedTo: 'manual',
              priority: 'medium'
            }
          }
        });

        results.push({
          recipient,
          status: 'queued',
          jobId: job.id
        });
      } catch (error) {
        results.push({
          recipient,
          status: 'failed',
          error: error.message
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Notifications queued successfully',
      data: results
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Get notification statistics
// @route   GET /api/v1/notifications/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateRange = {};

    if (startDate && endDate) {
      dateRange.start = startDate;
      dateRange.end = endDate;
    }

    const stats = await NotificationService.getNotificationStats(
      req.user.organization,
      dateRange
    );

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;