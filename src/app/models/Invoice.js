const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoice = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Login', required: true },
    filePath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},{
    timestamps:true,
});

module.exports = mongoose.model('Invoice',Invoice)