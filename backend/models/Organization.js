const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an organization name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  logo: {
    type: String,
    default: 'no-logo.png'
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  industry: {
    type: String,
    enum: ['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing', 'real_estate', 'consulting', 'other']
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  contact: {
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'trial', 'expired'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    features: {
      maxUsers: { type: Number, default: 5 },
      maxStorage: { type: Number, default: 1 }, // GB
      modules: {
        crm: { type: Boolean, default: true },
        projects: { type: Boolean, default: false },
        hr: { type: Boolean, default: false },
        invoicing: { type: Boolean, default: false },
        reports: { type: Boolean, default: false },
        api: { type: Boolean, default: false }
      }
    }
  },
  settings: {
    currency: { type: String, default: 'USD' },
    dateFormat: { type: String, default: 'MM/DD/YYYY' },
    timeFormat: { type: String, default: '12' },
    timezone: { type: String, default: 'UTC' },
    fiscalYearStart: { type: String, default: 'January' },
    workingDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    workingHours: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    }
  },
  integrations: {
    email: {
      provider: String,
      settings: mongoose.Schema.Types.Mixed
    },
    payment: {
      stripe: {
        publicKey: String,
        secretKey: String
      }
    },
    storage: {
      provider: String,
      settings: mongoose.Schema.Types.Mixed
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create organization slug from name
OrganizationSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

// 👉 Auto set trial/free expiry (1 day)
OrganizationSchema.pre('save', function (next) {
  if (this.isModified('subscription.plan') || this.isNew) {
    if (this.subscription.plan === 'free' || this.subscription.status === 'trial') {
      const expiryDate = new Date(this.subscription.startDate || Date.now());
      expiryDate.setDate(expiryDate.getDate() + 1);
      this.subscription.endDate = expiryDate;
    } else {
      this.subscription.endDate = null;
    }
  }
  next();
});

// 👉 Check if expired
OrganizationSchema.methods.isExpired = function () {
  if (
    (this.subscription.plan === 'free' || this.subscription.status === 'trial') &&
    this.subscription.endDate
  ) {
    return new Date() > new Date(this.subscription.endDate);
  }
  return false;
};

// Reverse populate with virtuals
OrganizationSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'organization',
  justOne: false
});

module.exports = mongoose.model('Organization', OrganizationSchema);