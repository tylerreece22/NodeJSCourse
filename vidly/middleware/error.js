const winston = require('winston');

// A middleware used specifically for catching
// exceptions in express
module.exports = function (e, req, res, next) {
    winston.error(e.message, e)

    res.status(500).send('Something failed.')
}