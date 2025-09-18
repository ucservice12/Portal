const express = require('express');
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  addActivity,
  addNote,
  convertLead,
  getLeadStats
} = require('../controllers/leadController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(getLeads)
  .post(authorize('admin', 'manager', 'sales'), createLead);

router.get('/stats', getLeadStats);

router
  .route('/:id')
  .get(getLead)
  .put(updateLead)
  .delete(authorize('admin', 'manager'), deleteLead);

router.post('/:id/activities', addActivity);
router.post('/:id/notes', addNote);
router.post('/:id/convert', authorize('admin', 'manager', 'sales'), convertLead);

module.exports = router;