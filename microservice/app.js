const express = require('express');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('./middleware/errorMiddleware');
const gradesRoutes = require('./routes/grades');

const app = express();

// Middleware
app.use(express.json());

// Auth middleware
app.use((req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Check if password needs to be changed
    if (req.user.tempPassword) {
      return res.status(403).json({ message: 'Password change required' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Routes
app.use('/api/grades', gradesRoutes);

// Error handling
app.use(errorHandler);

app.listen(3001, () => console.log('Microservice running on port 3001'));