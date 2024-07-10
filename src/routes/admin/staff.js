const express = require('express')
const router = express.Router()

const staffController = require('../../app/controllers/admin/StaffController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/create',requireAdmin,staffController.create)
router.post('/store',requireAdmin,staffController.store)
router.get('/:id/edit',requireAdmin,staffController.edit)
router.post('/:id',requireAdmin,staffController.update)
router.post('/:id/delete',requireAdmin,staffController.destroy)
router.get('/',requireAdmin,staffController.index)


module.exports = router