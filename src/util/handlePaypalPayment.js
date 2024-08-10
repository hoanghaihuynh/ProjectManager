
const axios = require('axios');
const paypal = require('../config/payment/payPal');

const getExchangeRate = async () => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        return response.data.rates.VND;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
};

const handlePaypalPayment = async (req, res, order, userId) => {
    try {
        const exchangeRate = await getExchangeRate();
        if (!exchangeRate) {
            return res.status(500).json({ error: 'ERROR 500', message: 'Failed to fetch exchange rate' });
        }

        // Tạo danh sách mục hàng cho giao dịch
        const items = order.items.map(item => {
            const priceInUSD = (item.priceItem / exchangeRate).toFixed(2);
            return {
                name: item.name,
                sku: item.productId.toString(),
                price: priceInUSD,
                currency: 'USD',
                quantity: item.quantity
            };
        });

        // Tính subtotal của các mục
        const itemSubtotal = items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
        let total = itemSubtotal;

        console.log('Exchange rate:', exchangeRate);
        console.log('Items:', items);
        console.log('Item Subtotal:', itemSubtotal);
        console.log('Total before discount:', total);

        // Áp dụng logic giảm giá
        let discountInUSD = 0;
        if (order.discountType === 'fixed') {
            discountInUSD = (order.discountValue / exchangeRate).toFixed(2);
        } else if (order.discountType === 'percentage') {
            discountInUSD = (total * (order.discountValue / 100)).toFixed(2);
        }

        // Cập nhật tổng số tiền sau khi giảm giá
        total = (total - parseFloat(discountInUSD)).toFixed(2);
        // Đảm bảo tổng không nhỏ hơn 0.01
        if (parseFloat(total) < 0.01) total = '0.01';

        console.log('Discount Type:', order.discountType);
        console.log('Discount Value:', order.discountValue);
        console.log('Discount in USD:', discountInUSD);
        console.log('Total after discount:', total);

        const create_payment_json = {           
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:8000/order/paypal/success?orderId=${order._id}&total=${total}`,
                "cancel_url": "http://localhost:8000/order/paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": items
                },
                "amount": {
                    "currency": 'USD',
                    "total": total, // Tổng sau giảm giá
                    "details": {
                        "subtotal": itemSubtotal, // Giá gốc của món hàng
                        "discount": discountInUSD // Giá trị giảm giá
                    }
                },
                "description": "Payment description"
            }]
        };

        console.log(JSON.stringify(create_payment_json, null, 2));

        // Tạo giao dịch với PayPal
        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                console.error('PayPal Error:', error);
                if (error.response && error.response.details) {
                    console.error('Error details:', error.response.details);
                }
                return res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error', details: error.response ? error.response.details : null });
            }
            const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
            console.log('Approval URL:', approvalUrl);
            res.json({ forwardLink: approvalUrl });
        });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'ERROR 500', message: 'Internal Server Error' });
    }
};

module.exports = handlePaypalPayment;
