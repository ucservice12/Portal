const EmailTemplate = require('../models/EmailTemplate');

// @desc    Create email template
// @route   POST /api/v1/email-templates
// @access  Private/Admin
exports.createTemplate = async (req, res) => {
  try {
    // Add user and organization to request body
    req.body.createdBy = req.user.id;
    req.body.organization = req.user.organization;

    const template = await EmailTemplate.create(req.body);

    res.status(201).json({
      success: true,
      data: template
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all email templates
// @route   GET /api/v1/email-templates
// @access  Private/Admin
exports.getTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find({ organization: req.user.organization })
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single email template
// @route   GET /api/v1/email-templates/:id
// @access  Private/Admin
exports.getTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found'
      });
    }

    // Make sure user belongs to template's organization
    if (template.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this template'
      });
    }

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update email template
// @route   PUT /api/v1/email-templates/:id
// @access  Private/Admin
exports.updateTemplate = async (req, res) => {
  try {
    let template = await EmailTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found'
      });
    }

    // Make sure user belongs to template's organization
    if (template.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this template'
      });
    }

    // Update updatedAt timestamp
    req.body.updatedAt = Date.now();

    template = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete email template
// @route   DELETE /api/v1/email-templates/:id
// @access  Private/Admin
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found'
      });
    }

    // Make sure user belongs to template's organization
    if (template.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this template'
      });
    }

    // Don't allow deletion of default template if it's the only one of its type
    if (template.isDefault) {
      const count = await EmailTemplate.countDocuments({
        organization: req.user.organization,
        type: template.type
      });

      if (count === 1) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the only default template'
        });
      }
    }

    await template.remove();

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