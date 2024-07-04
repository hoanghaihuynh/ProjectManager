const { body, validationResult } = require('express-validator');
const validateIngredient = [
    body('price').isFloat({ min: 0 }).withMessage('Price phải là một số dương'),
    body('quantity').isFloat({ min: 0 }).withMessage('Quantity phải là một số dương'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
module.exports = validateIngredient;