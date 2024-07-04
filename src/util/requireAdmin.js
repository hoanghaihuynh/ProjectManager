
const jwt = require('jsonwebtoken');
const secretKey = 'admin';

function adminAuthMiddleware(req, res, next) {
    // Lấy token từ cookie
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(403).send('Truy cập bị từ chối');
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, secretKey);
        
        // Kiểm tra role
        if (decoded.role !== 'admin') {
            return res.status(403).send('Truy cập bị từ chối');
        }
        
        
        next();
    } catch (error) {
        console.log('Error:', error);
        return res.status(403).send('Truy cập bị từ chối');
    }
}

module.exports = adminAuthMiddleware;


