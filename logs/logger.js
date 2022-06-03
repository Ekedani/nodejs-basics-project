const winston = require('winston');

const currentYear = new Date().getFullYear();

const logConfiguration = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: `./logs/${currentYear}.log` }),
    new winston.transports.Console()
  ]
};

module.exports = winston.createLogger(logConfiguration);
