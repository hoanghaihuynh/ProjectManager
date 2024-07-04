// use express-validator check data
const { body, validationResult } = require('express-validator');

// Định nghĩa middleware xác thực
const validateMenu = [
    body('price').isFloat({ min: 0 }).withMessage('Price phải là một số dương'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateMenu;


