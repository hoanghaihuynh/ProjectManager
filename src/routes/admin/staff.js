const express = require('express')
const router = express.Router()

const staffController = require('../../app/controllers/admin/StaffController')
const authToken = require('../../util/authenticateToken')
const requireAdmin = require('../../util/requireAdmin')

router.get('/create',authToken,requireAdmin,staffController.create)
router.post('/store',authToken,requireAdmin,staffController.store)
router.get('/:id/edit',authToken,requireAdmin,staffController.edit)
router.post('/:id',authToken,requireAdmin,staffController.update)
router.post('/:id/delete',authToken,requireAdmin,staffController.destroy)
router.get('/',authToken,requireAdmin,staffController.index)


module.exports = router