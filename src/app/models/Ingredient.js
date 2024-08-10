const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String } 
}, {
    timestamps: true,
});

IngredientSchema.pre('save', function(next) {
    const today = new Date();
    const expiryDate = this.expiryDate;
    
    if (expiryDate < today) {
        this.status = 'expired';
    } else if ((expiryDate - today) <= 5 * 24 * 60 * 60 * 1000) { //5 ngay
        this.status = 'expiring-soon';
    } else {
        this.status = 'fresh';
    }
    next();
});

module.exports = mongoose.model('Ingredient', IngredientSchema);