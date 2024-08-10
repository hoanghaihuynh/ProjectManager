const express = require('express')
const router = express.Router()

const aboutUsController = require('../../app/controllers/user/AboutUsController')



router.get('/',aboutUsController.index)

module.exports = router