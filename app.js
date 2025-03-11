const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(logger.requestLogger); // Custom Winston logging middleware/

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Welcome to the Opinion Trading App API' 
  });
})

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: err.message || 'Server Error' 
  });
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;