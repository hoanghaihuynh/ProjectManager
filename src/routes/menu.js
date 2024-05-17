const express = require('express')
const router = express.Router()

const menuController = require('../app/controllers/MenuController')

router.get('/:id/edit',menuController.edit)
router.put('/:id',menuController.update)
router.delete('/:id',menuController.destroy)
router.post('/store',menuController.store)
router.get('/',menuController.create)


module.exports = router