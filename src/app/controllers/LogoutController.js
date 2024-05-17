//const login=require('../models/Login')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')
// const session = require('express-session');
// const jwt = require('jsonwebtoken');
// const secretKey = 'admin';
class LoginController {
    //[GET] /
    index(req,res){
        res.clearCookie('token');
        res.redirect('/login');
    }
}

module.exports= new LoginController