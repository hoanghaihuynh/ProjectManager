const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.get('/stored/menu',meController.storedMenu)
router.get('/stored/staff',meController.storedStaff)
router.get('/stored/ingredient',meController.storedIngredient)

module.exports = router