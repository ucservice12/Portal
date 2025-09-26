const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    // Personal Info
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
      trim: true,
      maxlength: [50, "First name cannot be more than 50 characters"],
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [50, "Middle name cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    personalEmail: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number cannot be more than 20 characters"],
    },

    // Employee Info
    roles: [
      {
        type: String,
        enum: ["superadmin", "admin", "manager", "hr", "sales", "employee"],
        default: "employee",
      },
    ],
    reportingTo: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // manager or HR
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    workLocation: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    dob: {
      type: Date,
    },

    // Salary & Payroll
    salary: {
      basic: { type: Number, default: 0 },
      allowances: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      ctc: { type: Number, default: 0 },
      netPay: { type: Number, default: 0 },
    },

    // Authentication & Security
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "no-photo.jpg",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // Preferences & Permissions
    permissions: [
      {
        module: {
          type: String,
          enum: [
            "dashboard",
            "leads",
            "contacts",
            "deals",
            "tasks",
            "calendar",
            "reports",
            "settings",
            "users",
            "invoices",
            "projects",
            "tickets",
            "inventory",
            "hr",
            "payroll",
            "attendance",
          ],
        },
        actions: [
          {
            type: String,
            enum: ["create", "read", "update", "delete", "export", "import"],
          },
        ],
      },
    ],
    preferences: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" },
      timezone: { type: String, default: "UTC" },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
    },

    // Organization reference
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
UserSchema.virtual("computedFullName").get(function () {
  return `${
    this.firstName
  } ${this.middleName ? this.middleName + " " : ""}${this.lastName}`;
});

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Reset password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
