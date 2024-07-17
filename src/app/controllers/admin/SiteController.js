const menu=require('../../models/Menu')
const { mutipleMongooseToObject }=require('../../../util/mongoose')

class SiteController {
    //[GET] /
    index(req,res){
        Promise.all([
            menu.find({ type: 'coffee' }),
            menu.find({ type: 'juice' }),
            menu.find({ type: 'tea'}),
            menu.find({ type: 'yaourt'}),
            menu.find({ type: 'smoothie'}),
        ])
            .then(([coffee, juice, tea,yaourt,smoothie]) => {
                res.render('home', {
                    coffee: mutipleMongooseToObject(coffee),
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