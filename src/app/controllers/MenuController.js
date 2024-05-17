const menu=require('../models/Menu')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')

class MenuController {
    //[GET] /Menu
    create(req,res){
       res.render('menu/create')
    } 
    //[POST] /Menu/store
    store(req,res){
        const item = new menu(req.body);
        item.save()
            .then(()=>res.redirect('/'))
            .catch(err=>{
                
            })
    } 
    //[GET] /menu/:id/edit  
    edit(req,res){
        menu.findById(req.params.id)
        .then((item)=>{
            res.render('menu/edit',{ 
                item : mongooseToObject(item)
             })
        })
        .catch((err)=>{
            res.status(500).json({error : 'message'})
        })
       
    } 

    //[PUT] /menu/:id
    update(req,res){
       menu.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect('/me/stored/menu'))
            .catch((err)=>{
                
            })
    } 
    //[DELETE] /menu/:id
    destroy(req,res){
        menu.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch((err)=>{
                
            })
    }
}

module.exports= new MenuController