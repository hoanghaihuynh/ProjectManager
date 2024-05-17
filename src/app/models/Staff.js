const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    
    name: {type:String,require:true},
    numberPhone: {type:String,require:true},
    sex: {type:String,require:true},
    birthday:{type:Date,require:true},
    address: {type:String,require:true},
    img: {type:String,require:true},
    email: {type:String,require:true},
},{
    timestamps:true,
});

module.exports = mongoose.model('Staff',Staff)