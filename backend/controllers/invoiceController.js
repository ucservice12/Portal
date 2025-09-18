const Invoice = require('../models/Invoice');
const Contact = require('../models/Contact');
const Organization = require('../models/Organization');
const NotificationService = require('../services/NotificationService');
const PDFGenerator = require('../utils/pdfGenerator');
const crypto = require('crypto');
const path = require('path');

// @desc    Create new invoice
// @route   POST /api/v1/invoices
// @access  Private/Admin
exports.createInvoice = async (req, res) => {
  try {
    // Add user and organization to request body
    req.body.createdBy = req.user.id;
    req.body.organization = req.user.organization;

    const invoice = await Invoice.create(req.body);

    // Populate the invoice with related data
    await invoice.populate([
      { path: 'client', select: 'firstName lastName email company' },
      { path: 'organization', select: 'name contact' },
      { path: 'createdBy', select: 'firstName lastName email' }
    ]);

    res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all invoices
// @route   GET /api/v1/invoices
// @access  Private
exports.getInvoices = async (req, res) => {
  try {
    // Build query
    let query = { organization: req.user.organization };

    // Add filters from query params
    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.client) {
      query.client = req.query.client;
    }

    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }

    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      query.issueDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { invoiceNumber: searchRegex },
        { notes: searchRegex }
      ];
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Invoice.countDocuments(query);

    // Execute query
    const invoices = await Invoice.find(query)
      .populate([
        { path: 'client', select: 'firstName lastName email company' },
        { path: 'organization', select: 'name' },
        { path: 'createdBy', select: 'firstName lastName' }
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
      count: invoices.length,
      total,
      pagination,
      data: invoices
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single invoice
// @route   GET /api/v1/invoices/:id
// @access  Private
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate([
        { path: 'client', select: 'firstName lastName email phone company address' },
        { path: 'organization', select: 'name contact' },
        { path: 'createdBy', select: 'firstName lastName email' },
        { path: 'project', select: 'name projectId' },
        { path: 'deal', select: 'title dealId' }
      ]);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Make sure user belongs to same organization
    if (invoice.organization._id.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this invoice'
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update invoice
// @route   PUT /api/v1/invoices/:id
// @access  Private/Admin
exports.updateInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Make sure user belongs to same organization
    if (invoice.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this invoice'
      });
    }

    // Only admin can update invoices
    if (!['admin', 'manager'].includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update invoices'
      });
    }

    invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate([
      { path: 'client', select: 'firstName lastName email company' },
      { path: 'organization', select: 'name' },
      { path: 'createdBy', select: 'firstName lastName' }
    ]);

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/v1/invoices/:id
// @access  Private/Admin
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Make sure user belongs to same organization
    if (invoice.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this invoice'
      });
    }

    // Only admin can delete invoices
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete invoices'
      });
    }

    await invoice.deleteOne();

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

// @desc    Send invoice via email
// @route   POST /api/v1/invoices/:id/send
// @access  Private
exports.sendInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate([
        { path: 'client', select: 'firstName lastName email' },
        { path: 'organization', select: 'name contact' }
      ]);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Make sure user belongs to same organization
    if (invoice.organization._id.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to send this invoice'
      });
    }

    const { emailTemplate, customMessage, sendCopy } = req.body;

    // Generate PDF
    const pdfPath = await PDFGenerator.generateInvoice(invoice, invoice.organization);

    // Send email notification
    await NotificationService.queueNotification({
      type: 'email',
      data: {
        to: invoice.client.email,
        subject: `Invoice ${invoice.invoiceNumber} from ${invoice.organization.name}`,
        templateData: {
          type: 'invoice',
          clientName: `${invoice.client.firstName} ${invoice.client.lastName}`,
          invoiceNumber: invoice.invoiceNumber,
          total: invoice.total,
          currency: invoice.currency,
          dueDate: invoice.dueDate.toDateString(),
          companyName: invoice.organization.name,
          customMessage: customMessage || '',
          downloadLink: `${process.env.CLIENT_URL}/invoices/${invoice._id}/public`
        },
        organizationId: invoice.organization._id,
        metadata: {
          userId: req.user.id,
          relatedTo: 'invoice',
          relatedId: invoice._id,
          priority: 'medium'
        }
      }
    });

    // Send copy to sender if requested
    if (sendCopy) {
      await NotificationService.queueNotification({
        type: 'email',
        data: {
          to: req.user.email,
          subject: `Copy: Invoice ${invoice.invoiceNumber} sent to ${invoice.client.firstName} ${invoice.client.lastName}`,
          templateData: {
            type: 'invoice_copy',
            senderName: `${req.user.firstName} ${req.user.lastName}`,
            clientName: `${invoice.client.firstName} ${invoice.client.lastName}`,
            invoiceNumber: invoice.invoiceNumber,
            total: invoice.total,
            currency: invoice.currency
          },
          organizationId: invoice.organization._id,
          metadata: {
            userId: req.user.id,
            relatedTo: 'invoice',
            relatedId: invoice._id,
            priority: 'low'
          }
        }
      });
    }

    // Update invoice status
    invoice.status = 'sent';
    invoice.emailSettings.sent = true;
    invoice.emailSettings.sentDate = new Date();
    invoice.emailSettings.sentTo = [invoice.client.email];
    await invoice.save();

    res.status(200).json({
      success: true,
      message: 'Invoice sent successfully',
      data: invoice
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Download invoice PDF
// @route   GET /api/v1/invoices/:id/download
// @access  Private
exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate([
        { path: 'client', select: 'firstName lastName email company address' },
        { path: 'organization', select: 'name contact' }
      ]);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Make sure user belongs to same organization
    if (invoice.organization._id.toString() !== req.user.organization.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to download this invoice'
      });
    }

    // Generate PDF
    const pdfPath = await PDFGenerator.generateInvoice(invoice, invoice.organization);

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceNumber}.pdf"`);

    // Send file
    res.sendFile(path.resolve(pdfPath));
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get public invoice (for sharing)
// @route   GET /api/v1/invoices/:id/public
// @access  Public
exports.getPublicInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate([
        { path: 'client', select: 'firstName lastName email company' },
        { path: 'organization', select: 'name contact' }
      ]);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    // Generate public token if not exists
    if (!invoice.publicToken) {
      invoice.publicToken = crypto.randomBytes(32).toString('hex');
      await invoice.save();
    }

    // Update viewed status
    if (!invoice.viewedAt) {
      invoice.viewedAt = new Date();
      invoice.status = 'viewed';
      await invoice.save();
    }

    res.status(200).json({
      success: true,
      data: {
        invoice: {
          invoiceNumber: invoice.invoiceNumber,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate,
          status: invoice.status,
          items: invoice.items,
          subtotal: invoice.subtotal,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          discountAmount: invoice.discountAmount,
          total: invoice.total,
          currency: invoice.currency,
          notes: invoice.notes,
          terms: invoice.terms
        },
        client: invoice.client,
        organization: {
          name: invoice.organization.name,
          contact: invoice.organization.contact
        },
        publicUrl: `${process.env.CLIENT_URL}/invoice/view/${invoice.publicToken}`
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get invoice statistics
// @route   GET /api/v1/invoices/stats
// @access  Private
exports.getInvoiceStats = async (req, res) => {
  try {
    const matchQuery = { organization: req.user.organization };

    const stats = await Invoice.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$total' },
          avgAmount: { $avg: '$total' }
        }
      }
    ]);

    const paymentStats = await Invoice.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$total' }
        }
      }
    ]);

    const totalInvoices = await Invoice.countDocuments(matchQuery);
    const totalRevenue = await Invoice.aggregate([
      { $match: { ...matchQuery, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const overdueInvoices = await Invoice.countDocuments({
      ...matchQuery,
      dueDate: { $lt: new Date() },
      paymentStatus: { $ne: 'paid' }
    });

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        paymentStats,
        totalInvoices,
        totalRevenue: totalRevenue[0]?.total || 0,
        overdueInvoices
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};