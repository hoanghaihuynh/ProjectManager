const express = require('express')
const router = express.Router()

const menuController = require('../../app/controllers/user/MenuController')


router.post('/cart/add',menuController.addCart)
router.post('/:id/delete',menuController.destroy)
router.get('/',menuController.index)

module.exports = router