const express = require('express')
const router = express.Router()

const staffController = require('../app/controllers/StaffController')

router.get('/create',staffController.create)
router.post('/store',staffController.store)
router.get('/:id/edit',staffController.edit)
router.put('/:id',staffController.update)
router.delete('/:id',staffController.destroy)
router.get('/',staffController.index)


module.exports = router