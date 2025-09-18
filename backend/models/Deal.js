const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  dealId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please add a deal title'],
    trim: true
  },
  description: String,
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contact'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  value: {
    type: Number,
    required: [true, 'Please add deal value'],
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  stage: {
    type: String,
    enum: ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'],
    default: 'prospecting'
  },
  probability: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String,
    enum: ['website', 'social_media', 'referral', 'email_campaign', 'cold_call', 'event', 'advertisement', 'other'],
    default: 'other'
  },
  expectedCloseDate: Date,
  actualCloseDate: Date,
  lostReason: String,
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
  }],
  products: [{
    name: String,
    quantity: Number,
    price: Number,
    discount: Number,
    total: Number
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
    duration: Number,
    outcome: String,
    nextAction: String,
    nextActionDate: Date,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
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
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  competitors: [String],
  nextFollowUpDate: Date,
  isWon: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate deal ID
DealSchema.pre('save', async function(next) {
  if (!this.dealId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.dealId = `DEAL-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Update isWon status based on stage
DealSchema.pre('save', function(next) {
  if (this.isModified('stage')) {
    this.isWon = this.stage === 'closed_won';
    if (this.stage === 'closed_won' || this.stage === 'closed_lost') {
      this.actualCloseDate = new Date();
    }
  }
  next();
});

module.exports = mongoose.model('Deal', DealSchema);