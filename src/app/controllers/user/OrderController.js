const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const { mutipleMongooseToObject } = require('../../../util/mongoose');

class UserOrderController {
    index(req, res) {
        // Lấy danh sách các đơn hàng từ database và sắp xếp theo thời gian giảm dần
        Order.find().sort({ createdAt: -1 })
            .then(orders => {
                res.render('order', { orders: mutipleMongooseToObject(orders) });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
            });
    }
    add(req, res) {
        const userId = req.session.userId; 
        const item = new Order(req.body);
        item.userId = userId;
        item.save()
            .then(() => {

                // Emit sự kiện đến admin khi đơn hàng được lưu
                const io = req.app.get('io');
                io.emit('newOrder', { message: 'A new order has been placed.', order: item });

                return Cart.deleteMany({ userId: userId });
            })
            .then(() => {
                res.status(200).json({ message: 'Order placed successfully.' });
            })
            .catch(err => {
                res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
            });
    }
    view(req,res){
        Order.findByIdAndUpdate(req.params.id, { viewed: true })
        .then(() => {
            res.status(200).send('Order marked as viewed');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
        });
    }
}

module.exports = new UserOrderController();
