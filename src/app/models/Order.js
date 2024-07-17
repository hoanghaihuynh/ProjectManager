const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
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
        }
    ],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    numTable:{ type: Number, required: true},
    //status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'completed' },
    viewed: { type: Boolean, default: false },
},{
    timestamps:true,
});

module.exports = mongoose.model('Order',Order)
