const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Invoice = require('../../models/Invoice');
const path = require('path');
const generateInvoice = require('../../../util/invoiceTemplate');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const handlePaypalPayment = require('../../../util/handlePaypalPayment'); 
const paypal = require('paypal-rest-sdk');  

class UserOrderController {
    // index(req, res) {
    //     Order.find().sort({ createdAt: -1 })
    //         .then(orders => {
    //             res.render('order', { orders: mutipleMongooseToObject(orders) });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
    //         });
    // }
    index(req, res) {
        const page = parseInt(req.query.page) || 1; // Lấy trang từ query, mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Số lượng đơn hàng mỗi trang, mặc định là 10
        const skip = (page - 1) * limit; // Số bản ghi cần bỏ qua
    
        Order.find()
            .sort({ createdAt: -1 })
            .skip(skip) // Bỏ qua số bản ghi đã tính
            .limit(limit) // Giới hạn số bản ghi trả về
            .then(orders => {
                // Tính tổng số đơn hàng để biết số trang
                return Order.countDocuments().then(totalCount => {
                    const totalPages = Math.ceil(totalCount / limit); // Tính tổng số trang
                    res.render('order', { 
                        orders: mutipleMongooseToObject(orders),
                        currentPage: page,
                        totalPages: totalPages
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
            });
    }
    

    payment = async (req, res) => {
        const userId = req.session.userId;
        const orderData = req.body;

        const order = new Order({
            ...orderData,
            userId: userId,
            status: 'pending',
            voucherCode: orderData.voucherCode || null, // hoặc giá trị mặc định
            discountType: orderData.discountType || null,
            discountValue: orderData.discountValue || 0, 
        });
        await order.save();  
        try {
            if (order.paymentMethod === 'cash') {
                order.status='cash'
                order.status = 'completed'
                await order.save();
                const io = req.app.get('io');
                io.emit('newOrder', { message: 'A new order has been placed.', order: order });

                const pdfPath = path.join(__dirname, '../../../../invoices', `${order._id}.pdf`);
                await Promise.all([
                    generateInvoice(order, pdfPath),
                    new Invoice({
                        orderId: order._id,
                        userId: userId,
                        filePath: pdfPath
                    }).save(),
                    Cart.deleteMany({ userId: userId }),
                    res.status(200).json({ message: 'Order placed and invoice created successfully.' })
                ]);
            } else if (order.paymentMethod === 'paypal') {
                order.status='papal'
                handlePaypalPayment(req, res, order, userId);
            }
        } catch (err) {
            console.error('Error occurred during payment:', err);
            res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
        }
    };

    async paypalSuccess(req, res) {
        const { paymentId, PayerID, orderId, total } = req.query;

        const execute_payment_json = {
            "payer_id": PayerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total.toString() 
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                console.error('PayPal Execute Error:', error.response);
                return res.status(500).send('Payment failed');
            } else {
                try {
                    const order = await Order.findById(orderId);
                    if (!order) {
                        return res.status(404).send('Order not found');
                    }
                    order.status = 'completed';
                    await order.save();

                    const io = req.app.get('io');
                    io.emit('newOrder', { message: 'A new order has been placed.', order: order });
    
                    const pdfPath = path.join(__dirname, '../../../../invoices', `${order._id}.pdf`);

                    await Cart.deleteMany({ userId: order.userId });

                    res.redirect('/menu?status=success');
                } catch (err) {
                    console.error('Order Update Error:', err);
                    res.status(500).send('Failed to update order status');
                }
            }
        });
    }

    paypalCancel(req, res) {
        res.send('Payment cancelled');
    }

    view(req, res) {
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
