const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');

// Admin-only routes
router.post('/reset-password/:userId', 
  authenticateJWT, 
  authorizeRole('admin'), 
  adminController.resetUserPassword
);

router.delete('/users/:userId', 
  authenticateJWT, 
  authorizeRole('admin'), 
  adminController.deleteUser
);

module.exports = router;