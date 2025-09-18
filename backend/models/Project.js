const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
    required: true
  },
  projectId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true
  },
  description: String,
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contact'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  projectManager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  team: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    role: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  budget: {
    estimated: Number,
    actual: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  timeline: {
    startDate: Date,
    endDate: Date,
    actualStartDate: Date,
    actualEndDate: Date
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [{
    name: String,
    description: String,
    dueDate: Date,
    completedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'completed', 'overdue'],
      default: 'pending'
    }
  }],
  tags: [String],
  customFields: [{
    name: String,
    value: mongoose.Schema.Types.Mixed
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

// Generate project ID
ProjectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    const count = await this.constructor.countDocuments({ organization: this.organization });
    this.projectId = `PROJ-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Reverse populate with virtuals
ProjectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'relatedId',
  justOne: false,
  match: { relatedTo: 'project' }
});

module.exports = mongoose.model('Project', ProjectSchema);