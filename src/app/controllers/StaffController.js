const staff=require('../models/Staff')
const { mutipleMongooseToObject, mongooseToObject }=require('../../util/mongoose')

class StaffController {
    //[GET] /
    index(req,res){
        staff.find()
            .then((staffs)=>{
                res.render('staff',{ 
                    staffs : mutipleMongooseToObject(staffs)
                 })
            })
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    }
    //[GET] /addStaff
    create(req,res){
        res.render('staff/create')
     } 
     //[POST] /staff/store
    store(req,res){
         const item = new staff(req.body);
         item.save()
             .then(()=>res.redirect('/staff'))
             .catch(err=>{
                 
             })
     } 
     //[GET] /staff/:id/edit
     edit(req,res){
        staff.findById(req.params.id)
        .then((Staff)=>{
            res.render('staff/edit',{ 
                Staff : mongooseToObject(Staff)
             })
        })
        .catch((err)=>{
            res.status(500).json({error : 'messagehehehehe'})
        })
     }
     update(req,res){
        staff.updateOne({_id:req.params.id},req.body)
             .then(()=>res.redirect('/me/stored/staff'))
             .catch((err)=>{
                 
             })
     } 
     //[DELETE] /staff/:id
     destroy(req,res){
        staff.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch((err)=>{
                res.status(500).json({error : 'messagehehehehe'})
            })
     }
}

module.exports= new StaffController