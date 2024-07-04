const menu = require('../../models/Menu');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const cart = require('../../models/Cart');

class SiteController {
    //[GET] /
    index(req, res) {
        Promise.all([
            menu.find({ type: 'caffee' }),
            menu.find({ type: 'juice' }),
            menu.find({ type: 'tea' }),
            menu.find({ type: 'yaourt' }),
            menu.find({ type: 'smoothie' }),
        ])
        .then(([caffee, juice, tea, yaourt, smoothie]) => {
            res.render('user/menu', {
                caffee: mutipleMongooseToObject(caffee),
                juice: mutipleMongooseToObject(juice),
                tea: mutipleMongooseToObject(tea),
                yaourt: mutipleMongooseToObject(yaourt),
                smoothie: mutipleMongooseToObject(smoothie),
                layout: 'mainUser.hbs'
            });
        })
        .catch((err) => {
            res.status(500).json({ error: 'message' });
        });
    }
    addCart(req, res) {
        //const userId = req.session.userId;
        // console.log('User ID:', userId);
        // const { productId, name, image, priceItem, totalPrice, quantity, size, sugar, ice, description } = req.body;
        // const newItem = new cart({
        //   userId: req.session.userId, 
        //   productId: productId,
        //   name: name,
        //   image: image,
        //   priceItem: priceItem, 
        //   totalPrice: totalPrice,
        //   quantity: quantity,
        //   size: size,
        //   sugar: sugar,
        //   ice: ice,
        //   description: description
        // });
        //newItem.save()
        const userId = req.session.userId; 
        const item = new cart(req.body);
        item.userId=userId
        item.save()
          .then(() => {
            res.json({ success: true, message: 'Đã thêm vào giỏ hàng' });
          })
          .catch(err => {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
            res.status(500).json({ success: false, message: 'Lỗi khi thêm vào giỏ hàng' });
          })
        }
  // [GET] /cart/items
  getCartItems(req, res) {
    const userId = req.session.userId; 

    cart.find({ userId: userId })
        .then(items => {
            res.json({ success: true, items: mutipleMongooseToObject(items) });
        })
        .catch(err => {
            console.error('Lỗi khi lấy sản phẩm từ giỏ hàng:', err);
            res.status(500).json({ success: false, message: 'Lỗi khi lấy sản phẩm từ giỏ hàng' });
        });
  }
}

module.exports = new SiteController();
