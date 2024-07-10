const login=require('../models/Login')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')
const session = require('express-session');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'admin';
class LoginController {
    //[GET] /
    index(req,res){
        const message = req.query.message;
        if (message === 'success') {
            res.render('login', { layout: 'login.hbs', successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' });
        } else {
            res.render('login', { layout: 'login.hbs' });
        }
    }
    
    handleLogin(req, res) {
        const { username, password } = req.body;
        
        
        if (!username || !password) {
            return res.render('login', { layout: 'login.hbs', error: 'Vui lòng nhập đầy đủ thông tin đăng nhập' });
        }

       
        login.findOne({ username })
            .then(user => {
                if (!user) {
                    console.log('Không tìm thấy người dùng'); 
                    return Promise.reject('Không tìm thấy người dùng');
                }
               
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            return Promise.reject('Mật khẩu không chính xác');
                        }
                         // Lưu _id của người dùng vào session
                        req.session.userId = user._id;
                        req.session.name = user.name;
                        if (user.role === 'admin') {
                            const token = jwt.sign({ username, role: user.role }, secretKey);
                            res.cookie('token', token);
                            return res.redirect('/admin/');
                        }
                        if (user.role === 'user') {
                            const token = jwt.sign({ username, role: user.role }, secretKey);
                            res.cookie('token', token);
                            return res.redirect('/');
                        }
                        return Promise.reject('Truy cập bị từ chối');
                    });
            })
            .catch(error => {
                console.log('Error:', error);
                let errorMessage;
                if (error === 'Không tìm thấy người dùng' || error === 'Mật khẩu không chính xác' || error === 'Truy cập bị từ chối') {
                    errorMessage = error;
                } else {
                    errorMessage = 'Đã xảy ra lỗi';
                }
                res.render('login', { layout: 'login.hbs', error: errorMessage });
            });
    }
}

module.exports= new LoginController
