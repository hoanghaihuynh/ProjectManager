const menu=require('../models/Menu')
const { mutipleMongooseToObject }=require('../../util/mongoose')

class SiteController {
    //[GET] /
    index(req,res){
        // menu.find()
        //     .then((items)=>{
        //         res.render('home',{ 
        //             items : mutipleMongooseToObject(items)
        //          })
        //     })
        //     .catch((err)=>{
        //         res.status(500).json({error : 'message'})
        //     })
        // res.render('home')
        Promise.all([
            menu.find({ type: 'caffee' }),
            menu.find({ type: 'juice' }),
            menu.find({ type: 'tea'}),
            menu.find({ type: 'yaourt'}),
            menu.find({ type: 'smoothie'}),
        ])
            .then(([caffee, juice, tea,yaourt,smoothie]) => {
                res.render('home', {
                    caffee: mutipleMongooseToObject(caffee),
                    juice: mutipleMongooseToObject(juice),
                    tea: mutipleMongooseToObject(tea),
                    yaourt : mutipleMongooseToObject(yaourt),
                    smoothie : mutipleMongooseToObject(smoothie),
                });
            })
            .catch((err) => {
                res.status(500).json({ error: 'message' });
            });
    }
    
}

module.exports= new SiteController