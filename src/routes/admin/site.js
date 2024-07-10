const express = require('express')
const router = express.Router()
const siteController = require('../../app/controllers/admin/SiteController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/',requireAdmin,siteController.index)
module.exports = router