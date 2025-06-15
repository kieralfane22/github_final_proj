const { User } = require('../models');
const { logger } = require('../middleware/logger');
const crypto = require('crypto');

exports.createUser = async (req, res) => {
  try {
    // Generate temp password
    const tempPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'student',
      tempPassword: true
    });

    logger.info(`Admin ${req.user.email} created user ${user.email}`);

    // In production: Send email with temp password here
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user.id,
        email: user.email,
        tempPassword: process.env.NODE_ENV === 'development' ? tempPassword : undefined
      },
      warning: process.env.NODE_ENV !== 'development' 
        ? 'Temp password only shown in development' 
        : undefined
    });

  } catch (error) {
    logger.error(`User creation failed: ${error.message}`);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already exists',
        resolution: 'Use a different email or reset password for existing user'
      });
    }

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create user'
    });
  }
};