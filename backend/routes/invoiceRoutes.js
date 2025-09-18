const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  sendInvoice,
  downloadInvoice,
  getPublicInvoice,
  getInvoiceStats
} = require('../controllers/invoiceController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected except public

router
  .route('/')
  .get(getInvoices)
  .post(authorize('admin', 'manager'), createInvoice);

router.get('/stats', getInvoiceStats);

router
  .route('/:id')
  .get(getInvoice)
  .put(authorize('admin', 'manager'), updateInvoice)
  .delete(authorize('admin'), deleteInvoice);

router.post('/:id/send', sendInvoice);
router.get('/:id/download', downloadInvoice);

// Public route for invoice viewing
router.get('/:id/public', getPublicInvoice);

module.exports = router;