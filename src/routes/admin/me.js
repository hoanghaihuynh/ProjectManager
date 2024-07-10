const express = require('express')
const router = express.Router()

const meController = require('../../app/controllers/admin/MeController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/stored/menu',requireAdmin,meController.storedMenu)
router.get('/stored/staff',requireAdmin,meController.storedStaff)
router.get('/stored/ingredient',requireAdmin,meController.storedIngredient)

module.exports = router