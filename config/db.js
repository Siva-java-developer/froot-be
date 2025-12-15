const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        logger.info('MongoDB connected successfully');
    } catch (err) {
        logger.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;