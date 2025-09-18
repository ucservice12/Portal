const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Controller to be implemented
// const {
//   getDeals,
//   getDeal,
//   createDeal,
//   updateDeal,
//   deleteDeal,
//   addActivity,
//   addNote,
//   getDealStats
// } = require('../controllers/dealController');

// Placeholder route handlers
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all deals - To be implemented'
  });
});

router.get('/stats', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get deal statistics - To be implemented'
  });
});

router.get('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get deal ${req.params.id} - To be implemented`
  });
});

router.post('/', protect, authorize('admin', 'manager', 'sales'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create deal - To be implemented'
  });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update deal ${req.params.id} - To be implemented`
  });
});

router.delete('/:id', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete deal ${req.params.id} - To be implemented`
  });
});

router.post('/:id/activities', protect, (req, res) => {
  res.status(201).json({
    success: true,
    message: `Add activity to deal ${req.params.id} - To be implemented`
  });
});

router.post('/:id/notes', protect, (req, res) => {
  res.status(201).json({
    success: true,
    message: `Add note to deal ${req.params.id} - To be implemented`
  });
});

module.exports = router;