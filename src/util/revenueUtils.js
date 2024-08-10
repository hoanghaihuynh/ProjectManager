const getRevenueByPeriod = (orders, period) => {
    const periodStart = new Date();
    switch (period) {
        case 'daily':
            periodStart.setHours(0, 0, 0, 0);
            break;
        case 'weekly':
            const dayOfWeek = periodStart.getDay(); // Chủ nhật = 0, Thứ Hai = 1  
            const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Nếu là Chủ nhật, trừ 6 ngày, ngược lại trừ ngày hiện tại - 1  
            periodStart.setDate(periodStart.getDate() - daysToSubtract);  
            periodStart.setHours(0, 0, 0, 0);  
            break;
        case 'monthly':
            periodStart.setDate(1);
            periodStart.setHours(0, 0, 0, 0);
            break;
        default:
            return 0;
    }

    return orders
        .filter(order => new Date(order.createdAt) >= periodStart)
        .reduce((acc, order) => acc + order.totalPrice, 0);
};

const getTopSellingProducts = (orders) => {
    const productSales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (productSales[item.name]) {
                productSales[item.name] += item.quantity;
            } else {
                productSales[item.name] = item.quantity;
            }
        });
    });

    const sortedProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
    return sortedProducts.slice(0, 5).map(([name, quantity]) => ({ name, quantity }));
};

module.exports = {
    getRevenueByPeriod,
    getTopSellingProducts
};