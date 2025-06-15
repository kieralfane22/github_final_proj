const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { authenticateJWT } = require('../middleware/auth');

// Student grades (JWT required)
router.get('/', authenticateJWT, gradeController.getStudentGrades);

// Admin access (optional)
router.get('/all', 
  authenticateJWT, 
  (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  }, 
  gradeController.getAllGrades
);

module.exports = router;