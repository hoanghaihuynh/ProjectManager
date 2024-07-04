const menu=require('../../models/Menu')
const { mutipleMongooseToObject }=require('../../../util/mongoose')

class HomeController {
    //[GET] /
    index(req,res){
        res.render('user/home', { layout: 'mainUser.hbs' });
    }
}

module.exports= new HomeController