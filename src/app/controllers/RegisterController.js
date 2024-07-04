
const Login = require('../models/Login');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class RegisterController {
    // GET /register
    index(req, res) {
        res.render('register', { layout: 'login.hbs' });
    }

    // POST /register
    register(req, res) {
        const { name, username, password, password_confirmation } = req.body;

        // Kiểm tra nếu mật khẩu không khớp
        if (password !== password_confirmation) {
            return res.status(400).render('register', { layout: 'login.hbs', error: 'Mật khẩu không khớp' });
        }

        // Tìm kiếm người dùng đã tồn tại
        Login.findOne({ username: username })
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).render('register', { layout: 'login.hbs', error: 'Email đã tồn tại' });
                }

                // Hash mật khẩu
                return bcrypt.hash(password, saltRounds);
            })
            .then(hashedPassword => {
                // Tạo người dùng mới trong cơ sở dữ liệu
                const newUser = new Login({
                    name,
                    username,
                    password: hashedPassword,
                    role: 'user'
                });
                return newUser.save();
            })
            .then(() => {
                // Đăng ký thành công, chuyển hướng đến trang đăng nhập với thông báo thành công
                res.redirect('/login?message=success');
            })
            .catch(error => {
                console.error('Error:', error);
                let errorMessage;
                if (error.message === 'Email đã tồn tại' || error.message === 'Mật khẩu không khớp') {
                    errorMessage = error.message;
                    res.status(400).render('register', { layout: 'login.hbs', error: errorMessage });
                } else {
                    errorMessage = 'Đã xảy ra lỗi';
                    if (!res.headersSent) {
                        res.status(500).render('register', { layout: 'login.hbs', error: errorMessage });
                    }
                }
            });
    }
}

module.exports = new RegisterController();
