const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  invoiceNumber: {
    type: String,
    unique: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contact',
    required: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  deal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Deal'
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled'],
    default: 'draft'
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [{
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    default: 0
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  notes: String,
  terms: String,
  paymentTerms: String,
  paymentMethod: {
    type: String,
    enum: ['cash', 'check', 'bank_transfer', 'credit_card', 'paypal', 'stripe', 'other']
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  paidDate: Date,
  paymentReference: String,
  recurringSettings: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['weekly', 'monthly', 'quarterly', 'yearly']
    },
    nextInvoiceDate: Date,
    endDate: Date
  },
  emailSettings: {
    sent: {
      type: Boolean,
      default: false
    },
    sentDate: Date,
    sentTo: [String],
    emailTemplate: String
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  publicToken: String,
  viewedAt: Date,
  remindersSent: [{
    type: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate invoice number
InvoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    const year = new Date().getFullYear();
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Calculate totals before saving
InvoiceSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate discount amount
  if (this.discountType === 'percentage') {
    this.discountAmount = (this.subtotal * this.discountValue) / 100;
  } else {
    this.discountAmount = this.discountValue;
  }
  
  // Calculate tax amount
  const taxableAmount = this.subtotal - this.discountAmount;
  this.taxAmount = (taxableAmount * this.taxRate) / 100;
  
  // Calculate total
  this.total = taxableAmount + this.taxAmount;
  
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);