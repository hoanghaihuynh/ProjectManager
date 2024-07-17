const express = require('express')
const router = express.Router()

const contactController = require('../../app/controllers/user/ContactController')



router.get('/',contactController.index)
router.post('/',contactController.sendEmail)

module.exports = router