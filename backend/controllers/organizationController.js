const Organization = require("../models/Organization");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Secret for JWT signing
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRE || "1h";

// @desc    Create new organization
// @route   POST /api/v1/organizations
// @access  Private/Admin
exports.createOrganization = async (req, res) => {
  try {
    const { organizationName, userData } = req.body;

    if (!organizationName) {
      return res.status(400).json({ success: false, error: "Missing organization name" });
    }

    if (!userData) {
      return res.status(400).json({ success: false, error: "Missing user data" });
    }

    // Create user
    const user = await User.create(userData);

    try {
      // Create organization
      const organization = await Organization.create({
        name: organizationName,
        createdBy: user._id,
      });

      // Link organization to user
      user.organization = organization._id;
      await user.save();

      // --- Create JWT token ---
      const payload = {
        userId: user._id,
        email: user.email,
        organizationId: organization._id,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      return res.status(201).json({
        message: "User and Organization created successfully",
        userEmail: user.email,
        organizationId: organization._id,
        token,
      });
    } catch (orgError) {
      // Rollback user if org creation fails
      await User.deleteOne({ _id: user._id });

      return res.status(500).json({
        success: false,
        error: "Failed to create organization. User creation rolled back.",
        details: orgError.message,
      });
    }
  } catch (err) {
    console.log(err);
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
