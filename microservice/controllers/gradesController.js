const { Grades } = require('../models');

exports.getStudentGrades = async (req, res) => {
  try {
    // Verify student role
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const grades = await Grades.findAll({ 
      where: { studentId: req.user.id },
      attributes: ['course', 'grade', 'semester']
    });
    
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};