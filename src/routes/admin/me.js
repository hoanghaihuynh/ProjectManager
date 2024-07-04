const express = require('express')
const router = express.Router()

const meController = require('../../app/controllers/admin/MeController')
const authToken = require('../../util/authenticateToken')
const requireAdmin = require('../../util/requireAdmin')

router.get('/stored/menu',authToken,requireAdmin,meController.storedMenu)
router.get('/stored/staff',authToken,requireAdmin,meController.storedStaff)
router.get('/stored/ingredient',authToken,requireAdmin,meController.storedIngredient)

module.exports = router