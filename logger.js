const { createLogger, transports, format } = require('winston');
const conf = require('./msdata/config.json');

const timezoned = () => {
    return new Date().toLocaleString(conf.logger.timeZone.lang, {
        timeZone: conf.logger.timeZone.region,
    });
};

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: timezoned }),
        format.simple(),
    ),
    transports: [
        new transports.Console(),
        // new transports.File({
        //     filename: conf.logger.writeLogPath.error,
        //     level: 'error',
        // }),
        // new transports.File({ filename: conf.logger.writeLogPath.combined }),
    ],
});

module.exports = logger;