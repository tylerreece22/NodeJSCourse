const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    /*
    * winston will not handle uncaught exceptions meaning
    * if there is an exception and you have not caught it with a
    * catch block it will crash the app and not show up in the log
    * below is how to handle any uncaught exception
    * but this will not catch an unhandled promise rejection
    */
// commenting out because winston.handleExceptions will do this automagically
// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex)
//     process.exit(1)
// })

// much better to save these exceptions in a DB but in case a DB does not work the file system is always
// a good option.
// the below line will only handle uncaught exceptions, not unhandled rejections
// winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExceptions.log'}))

// Found a replacement for winston.handleExceptions from new version
    winston.exceptions.handle(
        new winston.transports.Console({
            level: 'trace',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: false
        }),
        new winston.transports.File({filename: 'uncaughtExceptions.log'}))

// Handles the problem above mentioned both problems mentioned above
    process.on('unhandledRejection', (ex) => {
        // throw exception because by throwing this exception is becomes
        // an uncaught exception and is caught by winston.handleExceptions
        throw ex
    })

    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    // winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', level: 'info'}));
}