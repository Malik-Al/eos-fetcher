const connectDB = require('./db/mongo');
const express = require('express');
const cron = require('node-cron');
const { fetchAndSaveActions } = require('./service/fetch');
const logger = require('./logger');
const config = require('./msdata/config.json');
const port = process.env.PORT || config.port;

const app = express();
app.use(express.json());
connectDB();

cron.schedule('*/60 * * * * *', fetchAndSaveActions);


app.listen(port, () => {
  try {
    logger.info(`[RUN...] App listening at http://localhost:${port}`);
  } catch (error) {
    logger.error(`[ERROR] Error listen`, error);
    throw error
  }
});
