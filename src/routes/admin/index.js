
const express = require('express');
const router = express.Router();


const ingredientRouter = require('./ingredient');
const meRouter = require('./me');
const siteRouter = require('./site');
const menuRouter = require('./menu');
const staffRouter = require('./staff');
const revenueRouter = require('./revenue');
const voucherRouter = require('./voucher');
const authToken = require('../../util/authenticateToken')

router.use('/menu',authToken, menuRouter);
router.use('/',authToken, siteRouter);
router.use('/me',authToken, meRouter);
router.use('/staff',authToken, staffRouter);
router.use('/ingredient',authToken, ingredientRouter);
router.use('/voucher',authToken, voucherRouter);
router.use('/revenue',authToken, revenueRouter);

module.exports = router;
