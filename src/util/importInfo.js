const jwt = require('jsonwebtoken');
const secretKey = 'admin';

function imporInfo(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Token không hợp lệ:', error);
        return res.redirect('/login'); 
    }
}

module.exports = imporInfo;
