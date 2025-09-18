const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  companyId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  website: String,
  industry: String,
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  revenue: Number,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  phone: String,
  email: String,
  type: {
    type: String,
    enum: ['customer', 'prospect', 'partner', 'vendor', 'competitor'],
    default: 'prospect'
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
  parentCompany: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
  }],
  socialProfiles: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
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
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate company ID
CompanySchema.pre('save', async function(next) {
  if (!this.companyId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.companyId = `COMP-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Reverse populate with virtuals
CompanySchema.virtual('contacts', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'company',
  justOne: false
});

module.exports = mongoose.model('Company', CompanySchema);