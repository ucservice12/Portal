const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Controller to be implemented
// const {
//   getContacts,
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
//   addActivity,
//   addNote
// } = require('../controllers/contactController');

// Placeholder route handlers
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all contacts - To be implemented'
  });
});

router.get('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get contact ${req.params.id} - To be implemented`
  });
});

router.post('/', protect, authorize('admin', 'manager', 'sales'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create contact - To be implemented'
  });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update contact ${req.params.id} - To be implemented`
  });
});

router.delete('/:id', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete contact ${req.params.id} - To be implemented`
  });
});

router.post('/:id/activities', protect, (req, res) => {
  res.status(201).json({
    success: true,
    message: `Add activity to contact ${req.params.id} - To be implemented`
  });
});

router.post('/:id/notes', protect, (req, res) => {
  res.status(201).json({
    success: true,
    message: `Add note to contact ${req.params.id} - To be implemented`
  });
});

module.exports = router;