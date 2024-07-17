const express = require('express')
const router = express.Router()

const revenueController = require('../../app/controllers/admin/RevenueController')
const requireAdmin = require('../../util/requireAdmin')


router.get('/',requireAdmin,revenueController.index)

module.exports = router