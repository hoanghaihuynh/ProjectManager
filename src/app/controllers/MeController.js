const menu=require('../models/Menu')
const staff=require('../models/Staff')
const ingredient=require('../models/Ingredient')
const { mutipleMongooseToObject }=require('../../util/mongoose')

class MeController {
    //[GET] /me/stored/menu
    storedMenu(req,res){
        menu.find()
            .then((items)=>{
                res.render('me/stored-menu',{ 
                    items : mutipleMongooseToObject(items)
                 })
            })
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    } 
     //[GET] /me/stored/staff
    storedStaff(req,res){
        staff.find()
            .then((staffs)=>{
                res.render('me/stored-staff',{ 
                    staffs : mutipleMongooseToObject(staffs)
                 })
            })
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    } 
    storedIngredient(req,res){
        ingredient.find()
            .then((ingredients)=>{
                res.render('me/stored-ingredient',{ 
                    ingredients : mutipleMongooseToObject(ingredients)
                 })
            })
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    } 
    
}

module.exports= new MeController