const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredient = new Schema({
    
    name: {type:String,require:true},
    price:{type:Number,require:true},
    img: {type:String,require:true},
    quantity:{type:Number,require:true},
},{
    timestamps:true,
});

module.exports = mongoose.model('Ingredient',Ingredient)