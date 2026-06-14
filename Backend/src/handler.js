require('dotenv').config();
const connectToDB = require('./config/database');

connectToDB().catch((err) => {
  console.error('Database connection failed:', err);
});

const app = require('./app');
module.exports = app;
