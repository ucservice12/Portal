const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  contactId: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: String,
  mobile: String,
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  jobTitle: String,
  department: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  type: {
    type: String,
    enum: ['customer', 'prospect', 'partner', 'vendor', 'other'],
    default: 'prospect'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'do_not_contact'],
    default: 'active'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  source: {
    type: String,
    enum: ['website', 'social_media', 'referral', 'email_campaign', 'cold_call', 'event', 'advertisement', 'other'],
    default: 'other'
  },
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
  }],
  socialProfiles: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  preferences: {
    emailOptIn: { type: Boolean, default: true },
    smsOptIn: { type: Boolean, default: false },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'sms'],
      default: 'email'
    }
  },
  birthday: Date,
  anniversary: Date,
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  activities: [{
    type: {
      type: String,
      enum: ['call', 'email', 'meeting', 'note', 'task'],
      required: true
    },
    subject: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    duration: Number,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],
  lastContactDate: Date,
  nextFollowUpDate: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
ContactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Generate contact ID
ContactSchema.pre('save', async function(next) {
  if (!this.contactId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.contactId = `CONT-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);