const express = require('express')
const router = express.Router()

const validateMenu = require('../../util/validateMenu')
const authToken = require('../../util/authenticateToken')
const menuController = require('../../app/controllers/admin/MenuController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/:id/edit',authToken,requireAdmin,menuController.edit)
router.post('/store',authToken,requireAdmin,menuController.store)
router.post('/:id/delete',authToken,requireAdmin,menuController.destroy)
router.get('/create',authToken,requireAdmin,menuController.create)
router.post('/:id',authToken,requireAdmin,menuController.update)


module.exports = router

