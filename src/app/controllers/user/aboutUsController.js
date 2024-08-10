
class aboutUsController {
    index(req, res) {
        res.render('user/aboutUs', { layout: 'mainUser.hbs'});
    }
}

module.exports = new aboutUsController();
