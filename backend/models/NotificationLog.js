const mongoose = require('mongoose');

const NotificationLogSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'push', 'in_app'],
    required: true
  },
  channel: {
    type: String,
    enum: ['nodemailer', 'twilio', 'firebase', 'socket'],
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  subject: String,
  message: {
    type: String,
    required: true
  },
  templateId: {
    type: mongoose.Schema.ObjectId,
    ref: 'EmailTemplate'
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed', 'bounced'],
    default: 'pending'
  },
  sentAt: Date,
  deliveredAt: Date,
  failedAt: Date,
  errorMessage: String,
  metadata: {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    relatedTo: String, // 'lead', 'deal', 'task', etc.
    relatedId: mongoose.Schema.ObjectId,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    tags: [String]
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 3
  },
  nextRetryAt: Date,
  externalId: String, // ID from external service (Twilio, etc.)
  cost: Number, // Cost of sending (for SMS, etc.)
  opened: {
    type: Boolean,
    default: false
  },
  openedAt: Date,
  clicked: {
    type: Boolean,
    default: false
  },
  clickedAt: Date
}, {
  timestamps: true
});

// Index for efficient querying
NotificationLogSchema.index({ organization: 1, status: 1, createdAt: -1 });
NotificationLogSchema.index({ recipient: 1, type: 1 });
NotificationLogSchema.index({ 'metadata.relatedTo': 1, 'metadata.relatedId': 1 });

module.exports = mongoose.model('NotificationLog', NotificationLogSchema);