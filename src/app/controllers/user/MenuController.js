const menu = require('../../models/Menu');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const cart = require('../../models/Cart');

class UserMenuController {
    
    index(req, res) {
        const userId = req.session.userId;
    
        Promise.all([
            menu.find({ type: 'coffee' }),
            menu.find({ type: 'juice' }),
            menu.find({ type: 'tea' }),
            menu.find({ type: 'yaourt' }),
            menu.find({ type: 'smoothie' }),
            cart.find({ userId: userId })
        ])
        .then(([coffee, juice, tea, yaourt, smoothie, items]) => {
            res.render('user/menu', {
                coffee: mutipleMongooseToObject(coffee),
                juice: mutipleMongooseToObject(juice),
                tea: mutipleMongooseToObject(tea),
                yaourt: mutipleMongooseToObject(yaourt),
                smoothie: mutipleMongooseToObject(smoothie),
                items: mutipleMongooseToObject(items),
                layout: 'mainUser.hbs',
                isMenu:true,
            });
        })
        .catch((err) => {
            console.error('Lỗi khi lấy dữ liệu menu:', err);
            res.status(500).json({ error: 'message' });
        });
    }
    

    //[POST] /menu/cart/add
    addCart(req, res) {
        const userId = req.session.userId; 
        const item = new cart(req.body);
        item.userId = userId;
        item.save()
          .then(() => {
            res.json({ success: true, message: 'Đã thêm vào giỏ hàng' });
          })
          .catch(err => {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
            res.status(500).json({ success: false, message: 'Lỗi khi thêm vào giỏ hàng' });
          });
    }
    destroy(req,res){
        cart.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
    }
}

module.exports = new UserMenuController();
