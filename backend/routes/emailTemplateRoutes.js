const express = require('express');
const {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate
} = require('../controllers/emailTemplateController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin', 'hr'), getTemplates)
  .post(protect, authorize('admin'), createTemplate);

router
  .route('/:id')
  .get(protect, authorize('admin', 'hr'), getTemplate)
  .put(protect, authorize('admin'), updateTemplate)
  .delete(protect, authorize('admin'), deleteTemplate);

module.exports = router;