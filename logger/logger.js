// Error Log is transmitted to Database also.
const winston = require('winston');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    timestamp: true,
    transports: [
        new winston.transports.File({ 
            filename: 'Logs/error.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            level: 'error' 
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'Logs/UncaughtExceptions.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
      )
    }));
}


module.exports = logger;