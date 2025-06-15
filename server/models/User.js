const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'student'),
    defaultValue: 'student'
  },
  tempPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  passwordUpdatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = User;