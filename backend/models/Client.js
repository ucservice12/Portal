const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  clientId: {
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
  type: {
    type: String,
    enum: ['individual', 'business'],
    default: 'individual'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
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
  totalInvoiced: {
    type: Number,
    default: 0
  },
  totalPaid: {
    type: Number,
    default: 0
  },
  outstandingBalance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
ClientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Generate client ID
ClientSchema.pre('save', async function(next) {
  if (!this.clientId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.clientId = `CLIENT-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Reverse populate with virtuals
ClientSchema.virtual('invoices', {
  ref: 'Invoice',
  localField: '_id',
  foreignField: 'client',
  justOne: false
});

module.exports = mongoose.model('Client', ClientSchema);