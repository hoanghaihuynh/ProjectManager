
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')
class LoginController {
    //[GET] /
    index(req,res){
        res.clearCookie('token');
        res.redirect('/login');
    }
}

module.exports= new LoginController