const express = require('express')
const router = express.Router()

const orderController = require('../../app/controllers/user/OrderController')
const requireAdmin = require('../../util/requireAdmin')

router.post('/payment',orderController.payment)
router.post('/:id/view',orderController.view)
router.get('/',requireAdmin,orderController.index)
router.get('/paypal/success',orderController.paypalSuccess)
router.get('/paypal/cancal',orderController.paypalCancel)

module.exports = router