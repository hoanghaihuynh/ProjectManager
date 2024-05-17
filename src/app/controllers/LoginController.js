//const login=require('../models/Login')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')
const session = require('express-session');
const jwt = require('jsonwebtoken');
const secretKey = 'admin';
class LoginController {
    //[GET] /
    index(req,res){
        res.render('login', { layout: 'login.hbs' });
    }
    
    handleLogin(req,res){
    //     const { email, password } = req.body;
    // // Xác thực thông tin đăng nhập ở đây
    //     if (email === 'hau69710@gmail.com' && password === 'password') {
    //         // Nếu đăng nhập thành công, tạo phiên làm việc và chuyển hướng
    //         session.isLoggedIn = true;
    //         res.redirect('/');
    //     } else {
    //         res.render('login', { layout: 'login.hbs', error: 'Invalid username or password' }); 
    //     }
    const { email, password } = req.body;
    // Xác thực thông tin đăng nhập ở đây
        if (email === 'hau69710@gmail.com' && password === 'password') {
            // Nếu đăng nhập thành công, tạo phiên làm việc và chuyển hướng
            const token = jwt.sign({ email }, secretKey);
                res.cookie('token', token);
                res.redirect('/');
        } else {
            res.render('login', { layout: 'login.hbs', error: 'Invalid username or password' }); 
        }
    }
}

module.exports= new LoginController