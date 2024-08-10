const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema({
  code: { type: String, required: true,unique:true},
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
},{
    timestamps:true,
});

module.exports = mongoose.model('Voucher',Voucher);
