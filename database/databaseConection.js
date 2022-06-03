const mongoose = require('mongoose');
const logger = require('../logs/logger');

module.exports = () => {
  const mongoPassword = process.env.CLUSTER_PASSWORD;

  const uri = `mongodb+srv://Andrii:${mongoPassword}@cluster0.lsltian.mongodb.net/NodeLab?retryWrites=true&w=majority`;
  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
      logger.log({
        message: 'Connected to MongoDB',
        level: 'info'
      });
    })
    .catch((err) => {
      logger.log({
        message: `MongoDB connection error: ${err.message}`,
        level: 'error'
      });
    });
};
