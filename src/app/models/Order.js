const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const Order = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'Login' },
            productId: { type: Schema.Types.ObjectId, ref: 'Menu' },
            name: { type: String, required: true },
            image: { type: String, required: true },
            priceItem: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true },
            sugar: { type: String, required: true },
            ice: { type: String, required: true },
            description: { type: String, required: true },
        }
    ],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    numTable: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'completed' },
    viewed: { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ['cash', 'paypal'], required: true },
    paymentId: { type: String },
    voucherCode: { type: String },
    discountType: { type: String },
    discountValue: { type: Number },
}, {
    timestamps: true,
});

Order.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', Order);
