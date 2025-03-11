const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
