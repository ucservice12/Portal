const mongoose = require('mongoose');

const EmailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a template name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  subject: {
    type: String,
    required: [true, 'Please add an email subject'],
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters']
  },
  body: {
    type: String,
    required: [true, 'Please add email body content'],
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  type: {
    type: String,
    enum: ['invoice', 'task', 'leave', 'attendance', 'asset', 'general'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Only one default template per type per organization
EmailTemplateSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { 
        organization: this.organization,
        type: this.type,
        _id: { $ne: this._id }
      },
      { isDefault: false }
    );
  }
  next();
});

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);