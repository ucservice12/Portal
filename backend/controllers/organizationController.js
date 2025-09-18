const Organization = require("../models/Organization");

// @desc    Create new organization
// @route   POST /api/v1/organizations
// @access  Private/Admin
const User = require('../models/User');
exports.createOrganization = async (req, res) => {
  try {
    const { organizationName, userData } = req.body;

    if (!organizationName || !userData) {
      return res.status(400).json({ success: false, error: "Missing organization name or user data" });
    }

    const user = await User.create(userData);

    try {
      const organization = await Organization.create({
        name: organizationName,
        createdBy: user._id,
      });

      user.organization = organization._id;
      await user.save();

      return res.status(201).json({
        success: true,
        message: "User and Organization created successfully",
        userId: user._id,
        organizationId: organization._id,
      });
    } catch (orgError) {
      await User.deleteOne({ _id: user._id });

      return res.status(500).json({
        success: false,
        error: "Failed to create organization. User creation rolled back.",
        details: orgError.message,
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: "Error creating user or organization",
      details: err.message,
    });
  }
};

// @desc    Get all organizations
// @route   GET /api/v1/organizations
// @access  Private/Admin
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();

    res.status(200).json({
      success: true,
      count: organizations.length,
      data: organizations,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single organization
// @route   GET /api/v1/organizations/:id
// @access  Private
exports.getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update organization
// @route   PUT /api/v1/organizations/:id
// @access  Private/Admin
exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Delete organization
// @route   DELETE /api/v1/organizations/:id
// @access  Private/Admin
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    await organization.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update organization subscription plan
// @route   PUT /api/v1/organizations/:id/subscription
// @access  Private/Admin
exports.updateSubscription = async (req, res) => {
  try {
    const { subscriptionPlan } = req.body;

    if (!subscriptionPlan) {
      return res.status(400).json({
        success: false,
        error: "Please provide a subscription plan",
      });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      {
        subscriptionPlan,
        subscriptionStartDate: Date.now(),
        subscriptionStatus: "active",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
