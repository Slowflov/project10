const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/argentBankDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Это можно оставить, если хотите
    });
    console.log('Database successfully connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = dbConnection;



