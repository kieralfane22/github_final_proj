const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// Database sync and server start
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});