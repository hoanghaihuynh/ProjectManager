
const jwt = require('jsonwebtoken');
const secretKey = 'admin';

function authenticateToken(req, res, next) {
  const token = req.cookies['token'];
  if (!token) return res.redirect('/login');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.redirect('/login');
    req.username = decoded.username;
    next();
  });
}

module.exports = authenticateToken;

