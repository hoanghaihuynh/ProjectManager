const express = require('express')
const router = express.Router()

const menuController = require('../../app/controllers/user/MenuController')


router.post('/cart/add',menuController.addCart)
router.get('/cart/items', menuController.getCartItems);
router.get('/',menuController.index)

module.exports = router