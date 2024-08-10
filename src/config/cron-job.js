// const cron = require('node-cron');
// const mongoose = require('mongoose');
// const Voucher = require('../app/models/Voucher');
// const Ingredient = require('../app/models/Ingredient');


// // Kết nối tới MongoDB
// mongoose.connect('mongodb://127.0.0.1/QLCF', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Cron job chạy mỗi ngày lúc nửa đêm (00:00)
// //cron.schedule('0 0 * * *', async () => {
// cron.schedule('* * * * *', async () => {
//     console.log('Checking for expired vouchers...');
//     try {
//         const now = new Date();
//         await Voucher.updateMany(
//             { expirationDate: { $lt: now }, isActive: true },
//             { $set: { isActive: false } }
//         );
//         console.log('Expired vouchers updated successfully');
//     } catch (error) {
//         console.error('Error updating expired vouchers:', error);
//     }
// });

// // Xuất module nếu cần thiết
// module.exports = cron;

const cron = require('node-cron');
const mongoose = require('mongoose');
const Voucher = require('../app/models/Voucher');
const Ingredient = require('../app/models/Ingredient');

// Kết nối tới MongoDB
mongoose.connect('mongodb+srv://honghihunh:VM7vWYkliImqsEiM@cluster0.tkt1sgp.mongodb.net/QLCF', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//00h
//cron.schedule('0 0 * * *', async () => {
cron.schedule('0 0 * * *', async () => {
    console.log('Checking for expired vouchers and updating ingredient statuses...');
    try {
        const now = new Date();

        // Cập nhật voucher hết hạn
        await Voucher.updateMany(
            { expirationDate: { $lt: now }, isActive: true },
            { $set: { isActive: false } }
        );
        console.log('Expired vouchers updated successfully');

        // Cập nhật trạng thái nguyên liệu
        const ingredients = await Ingredient.find(); // Lấy tất cả nguyên liệu
        for (const ingredient of ingredients) {
            const expiryDate = ingredient.expiryDate;
            if (expiryDate < now) {
                ingredient.status = 'expired';
            } else if ((expiryDate - now) <= 5 * 24 * 60 * 60 * 1000) { // 5 ngày
                ingredient.status = 'expiring-soon';
            } else {
                ingredient.status = 'fresh';
            }
            await ingredient.save(); // Lưu lại thay đổi
        }
        console.log('Ingredient statuses updated successfully');

    } catch (error) {
        console.error('Error updating expired vouchers or ingredient statuses:', error);
    }
});

module.exports = cron;
