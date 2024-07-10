
const express = require('express');
const router = express.Router();


const ingredientRouter = require('./ingredient');
const meRouter = require('./me');
const siteRouter = require('./site');
const menuRouter = require('./menu');
const staffRouter = require('./staff');
const authToken = require('../../util/authenticateToken')

router.use('/menu',authToken, menuRouter);
router.use('/',authToken, siteRouter);
router.use('/me',authToken, meRouter);
router.use('/staff',authToken, staffRouter);
router.use('/ingredient',authToken, ingredientRouter);

module.exports = router;
