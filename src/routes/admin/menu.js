const express = require('express')
const router = express.Router()

const validateMenu = require('../../util/validateMenu')
const menuController = require('../../app/controllers/admin/MenuController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/:id/edit',requireAdmin,menuController.edit)
router.post('/store',requireAdmin,menuController.store)
router.post('/:id/delete',requireAdmin,menuController.destroy)
router.get('/create',requireAdmin,menuController.create)
router.post('/:id',requireAdmin,menuController.update)


module.exports = router

