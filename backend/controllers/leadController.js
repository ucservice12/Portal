const Lead = require('../models/Lead');
const NotificationTriggers = require('../utils/notificationTriggers');

// @desc    Create new lead
// @route   POST /api/v1/leads
// @access  Private
exports.createLead = async (req, res) => {
  try {
    // Add user and organization to request body
    req.body.organization = req.user.organization;

    const lead = await Lead.create(req.body);

    // Populate the lead with related data
    await lead.populate([
      { path: 'assignedTo', select: 'firstName lastName email' },
      { path: 'organization', select: 'name' }
    ]);

    // Send notification
    await NotificationTriggers.onLeadCreated(lead);

    res.status(201).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all leads
// @route   GET /api/v1/leads
// @access  Private
exports.getLeads = async (req, res) => {
  try {
    // Build query
    let query = { organization: req.user.organization };

    // Filter by assigned user if not admin/manager
    if (!['admin', 'manager'].includes(req.user.role)) {
      query.assignedTo = req.user.id;
    }

    // Add filters from query params
    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.source) {
      query.source = req.query.source;
    }

    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }

    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
        { phone: searchRegex }
      ];
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Lead.countDocuments(query);

    // Execute query
    const leads = await Lead.find(query)
      .populate([
        { path: 'assignedTo', select: 'firstName lastName email' },
        { path: 'organization', select: 'name' }
      ])
      .sort(req.query.sort || '-createdAt')
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      pagination,
      data: leads
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single lead
// @route   GET /api/v1/leads/:id
// @access  Private
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate([
        { path: 'assignedTo', select: 'firstName lastName email phone' },
        { path: 'organization', select: 'name' },
        { path: 'activities.createdBy', select: 'firstName lastName' },
        { path: 'notes.createdBy', select: 'firstName lastName' }
      ]);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization._id.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this lead'
      });
    }

    // Check if user can access this lead
    if (!['admin', 'manager'].includes(req.user.role) && 
        lead.assignedTo && 
        lead.assignedTo._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this lead'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update lead
// @route   PUT /api/v1/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this lead'
      });
    }

    // Check if user can update this lead
    if (!['admin', 'manager'].includes(req.user.role) && 
        lead.assignedTo && 
        lead.assignedTo.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this lead'
      });
    }

    const oldStatus = lead.status;
    
    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate([
      { path: 'assignedTo', select: 'firstName lastName email' },
      { path: 'organization', select: 'name' }
    ]);

    // Send notification if status changed
    if (oldStatus !== lead.status) {
      await NotificationTriggers.onLeadStatusChanged(lead, oldStatus, lead.status);
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/v1/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this lead'
      });
    }

    // Only admin and managers can delete leads
    if (!['admin', 'manager'].includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete leads'
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add activity to lead
// @route   POST /api/v1/leads/:id/activities
// @access  Private
exports.addActivity = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to add activity to this lead'
      });
    }

    // Add user to activity
    req.body.createdBy = req.user.id;

    lead.activities.push(req.body);
    await lead.save();

    await lead.populate([
      { path: 'assignedTo', select: 'firstName lastName email' },
      { path: 'activities.createdBy', select: 'firstName lastName' }
    ]);

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add note to lead
// @route   POST /api/v1/leads/:id/notes
// @access  Private
exports.addNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to add note to this lead'
      });
    }

    // Add user to note
    req.body.createdBy = req.user.id;

    lead.notes.push(req.body);
    await lead.save();

    await lead.populate([
      { path: 'assignedTo', select: 'firstName lastName email' },
      { path: 'notes.createdBy', select: 'firstName lastName' }
    ]);

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Convert lead to contact/deal
// @route   POST /api/v1/leads/:id/convert
// @access  Private
exports.convertLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Make sure user belongs to same organization
    if (lead.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to convert this lead'
      });
    }

    const { convertTo, dealValue, dealTitle } = req.body;

    if (!['contact', 'deal'].includes(convertTo)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversion type'
      });
    }

    // Convert logic would go here
    // For now, just mark as converted
    lead.isConverted = true;
    lead.convertedTo = convertTo;
    lead.status = 'won';
    await lead.save();

    res.status(200).json({
      success: true,
      data: lead,
      message: `Lead successfully converted to ${convertTo}`
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get lead statistics
// @route   GET /api/v1/leads/stats
// @access  Private
exports.getLeadStats = async (req, res) => {
  try {
    const matchQuery = { organization: req.user.organization };

    // Filter by assigned user if not admin/manager
    if (!['admin', 'manager'].includes(req.user.role)) {
      matchQuery.assignedTo = req.user.id;
    }

    const stats = await Lead.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$estimatedValue' },
          avgValue: { $avg: '$estimatedValue' }
        }
      }
    ]);

    const sourceStats = await Lead.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalLeads = await Lead.countDocuments(matchQuery);
    const convertedLeads = await Lead.countDocuments({ ...matchQuery, isConverted: true });
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        sourceStats,
        totalLeads,
        convertedLeads,
        conversionRate: Math.round(conversionRate * 100) / 100
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};