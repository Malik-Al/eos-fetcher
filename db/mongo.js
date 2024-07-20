const mongoose = require('mongoose');
const config = require('../msdata/config.json')
const logger = require('../logger');
const mongoUrl = process.env.MONGO_URL || config.mongo_url;

const connectDB = async () => {
    try {
        exports.mongooDB = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('[SUCCESS] Connected to MongoDB');
    } catch (error) {
        logger.error('[FAILED] Failed to connect to MongoDB', error);
        throw error
    }
}

module.exports = connectDB;