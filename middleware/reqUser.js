const Database = require('../services/database');

module.exports = function (req, res, next) {
    if (!req.session.user) {
        return next();
    }

    req.user = Database.findUser(req.session.user.email);
    return next();

}