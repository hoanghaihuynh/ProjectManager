const Order = require('../../models/Order');
const { getRevenueByPeriod, getTopSellingProducts } = require('../../../util/revenueUtils');

class RevenueController {
    index(req, res) {
        const { startDate, endDate } = req.query;
    
        const allCompletedOrdersQuery = Order.find({ status: 'completed' });
        let dateRangeOrdersQuery;
        if (startDate && endDate) {
            dateRangeOrdersQuery = Order.find({
                status: 'completed',
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
            });
        } else {
            dateRangeOrdersQuery = Promise.resolve([]);
        }
    
        Promise.all([allCompletedOrdersQuery, dateRangeOrdersQuery])
            .then(([allCompletedOrders, dateRangeOrders]) => {

                const totalQuantity = allCompletedOrders.reduce((acc,order)=> acc + order.totalQuantity,0);

                const totalRevenue = allCompletedOrders.reduce((acc, order) => acc + order.totalPrice, 0);
                const dateRangeRevenue = dateRangeOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    
                const dailyRevenue = getRevenueByPeriod(allCompletedOrders, 'daily');
                const weeklyRevenue = getRevenueByPeriod(allCompletedOrders, 'weekly');
                const monthlyRevenue = getRevenueByPeriod(allCompletedOrders, 'monthly');
    
                const topSellingProducts = getTopSellingProducts(allCompletedOrders);
    
                res.render('revenue/index', {
                    totalQuantity,
                    totalRevenue,
                    dateRangeRevenue,
                    dailyRevenue,
                    weeklyRevenue,
                    monthlyRevenue,
                    topSellingProducts,
                    startDate,
                    endDate
                });
            })
            .catch((err) => {
                res.status(500).json({ error: 'Lỗi máy chủ', message: err.message });
            });
    }
}

module.exports = new RevenueController();
