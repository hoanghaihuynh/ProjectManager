const express = require('express')
const router = express.Router()

const orderController = require('../../app/controllers/user/OrderController')
const requireAdmin = require('../../util/requireAdmin')

router.post('/add',orderController.add)
router.post('/:id/view',orderController.view)
router.get('/',requireAdmin,orderController.index)

module.exports = router