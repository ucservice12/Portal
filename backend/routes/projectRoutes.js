const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Controller to be implemented
// const {
//   getProjects,
//   getProject,
//   createProject,
//   updateProject,
//   deleteProject,
//   addTeamMember,
//   removeTeamMember
// } = require('../controllers/projectController');

// Placeholder route handlers
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all projects - To be implemented'
  });
});

router.get('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get project ${req.params.id} - To be implemented`
  });
});

router.post('/', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create project - To be implemented'
  });
});

router.put('/:id', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update project ${req.params.id} - To be implemented`
  });
});

router.delete('/:id', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete project ${req.params.id} - To be implemented`
  });
});

router.post('/:id/team', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Add team member to project ${req.params.id} - To be implemented`
  });
});

router.delete('/:id/team/:userId', protect, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Remove team member from project ${req.params.id} - To be implemented`
  });
});

module.exports = router;