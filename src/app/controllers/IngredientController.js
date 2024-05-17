const ingredient=require('../models/Ingredient')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')

class IngredientController {
    // //[GET] /
    index(req,res){
        ingredient.find()
            .then((ingredients)=>{
                res.render('ingredient',{ 
                    ingredients : mutipleMongooseToObject(ingredients)
                 })
            })
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    }
    //[GET] /createIngredient
    create(req,res){
        res.render('ingredient/create')
     } 
     //[POST] /ingredient/store
    stored(req,res){
         const item = new ingredient(req.body);
         item.save()
             .then(()=>res.redirect('/ingredient'))
             .catch(err=>{
                 
             })
     } 
     //[GET] /ingredient/:id/edit
     edit(req,res){
        ingredient.findById(req.params.id)
        .then((Ingredient)=>{
            res.render('ingredient/edit',{ 
                Ingredient : mongooseToObject(Ingredient)
             })
        })
        .catch((err)=>{
            res.status(500).json({error : 'messagehehehehe'})
        })
     }
     update(req,res){
        ingredient.updateOne({_id:req.params.id},req.body)
             .then(()=>res.redirect('/me/stored/ingredient'))
             .catch((err)=>{
                 
             })
     } 
     //[DELETE] /ingredient/:id
     destroy(req,res){
        ingredient.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch((err)=>{
                res.status(500).json({error : 'messagehehehehe'})
            })
     }
}

module.exports= new IngredientController