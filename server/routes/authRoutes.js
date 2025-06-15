const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes (require JWT)
router.post('/change-password', authenticateJWT, authController.changePassword);
router.get('/users', authenticateJWT, authorizeRole('admin'), authController.getAllUsers);
router.post('/users', authenticateJWT, authorizeRole('admin'), authController.createUser);

module.exports = router;