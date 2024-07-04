const express = require('express')
const router = express.Router()
const siteController = require('../../app/controllers/admin/SiteController')
const authToken = require('../../util/authenticateToken')
const requireAdmin = require('../../util/requireAdmin')

router.get('/',authToken,requireAdmin,siteController.index)
module.exports = router