const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
//const authController = require('../app/controllers/AuthController') 
const authToken = require('../util/authenticateToken')
router.get('/',authToken,siteController.index)
module.exports = router