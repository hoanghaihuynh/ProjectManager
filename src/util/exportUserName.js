function exportUserName(req, res, next) {
    if (req.session.name) {
        res.locals.username = req.session.name;
    } else {
        res.locals.username = null;
    }
    next();
}

module.exports = exportUserName;
