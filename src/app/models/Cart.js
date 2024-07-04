const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    userId: {type:Schema.Types.ObjectId,ref:'Login'},
    productId:{type:Schema.Types.ObjectId,ref:'Menu'},
    name: {type:String,require:true},
    image: {type:String,require:true},
    priceItem:{type:Number,require:true},
    totalPrice:{type:Number,require:true},
    quantity:{type:Number,require:true},
    size:{type:String,require:true},
    sugar:{type:String,require:true},
    ice:{type:String,require:true},
    description:{type:String,require:true},
},{
    timestamps:true,
});

module.exports = mongoose.model('Cart',Cart)