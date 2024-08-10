const express = require('express')
const router = express.Router()

const voucherController = require('../../app/controllers/admin/VoucherController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/create',requireAdmin,voucherController.create)
router.post('/check',voucherController.check)
router.post('/store',requireAdmin,voucherController.store)
router.get('/:id/edit',requireAdmin,voucherController.edit)
router.post('/:id',requireAdmin,voucherController.update)
router.post('/:id/delete',requireAdmin,voucherController.destroy)
router.get('/',requireAdmin,voucherController.index)


module.exports = router