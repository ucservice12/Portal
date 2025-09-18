const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  leadId: {
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
  company: String,
  jobTitle: String,
  website: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  source: {
    type: String,
    enum: ['website', 'social_media', 'referral', 'email_campaign', 'cold_call', 'event', 'advertisement', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'on_hold'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  estimatedValue: {
    type: Number,
    default: 0
  },
  probability: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  expectedCloseDate: Date,
  actualCloseDate: Date,
  lostReason: String,
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
  }],
  activities: [{
    type: {
      type: String,
      enum: ['call', 'email', 'meeting', 'note', 'task', 'proposal', 'quote'],
      required: true
    },
    subject: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    duration: Number, // in minutes
    outcome: String,
    nextAction: String,
    nextActionDate: Date,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    attachments: [{
      name: String,
      url: String,
      type: String
    }]
  }],
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
  socialProfiles: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  lastContactDate: Date,
  nextFollowUpDate: Date,
  isConverted: {
    type: Boolean,
    default: false
  },
  convertedTo: {
    type: String,
    enum: ['contact', 'deal', 'customer']
  },
  convertedId: mongoose.Schema.ObjectId
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
LeadSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Generate lead ID
LeadSchema.pre('save', async function(next) {
  if (!this.leadId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.leadId = `LEAD-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Update last contact date when activity is added
LeadSchema.pre('save', function(next) {
  if (this.isModified('activities') && this.activities.length > 0) {
    this.lastContactDate = this.activities[this.activities.length - 1].date;
  }
  next();
});

module.exports = mongoose.model('Lead', LeadSchema);