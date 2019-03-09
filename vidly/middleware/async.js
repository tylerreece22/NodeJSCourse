// Manual approach to error handling if express-async-errors does not work
// This function basically gets rid of the nasty try-catch blocks all over
// the endpoints
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (e) {
            next(e);
        }
    }
}