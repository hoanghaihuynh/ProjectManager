
const express = require('express');
const router = express.Router();


const ingredientRouter = require('./ingredient');
const meRouter = require('./me');
const siteRouter = require('./site');
const menuRouter = require('./menu');
const staffRouter = require('./staff');

router.use('/menu', menuRouter);
router.use('/', siteRouter);
router.use('/me', meRouter);
router.use('/staff', staffRouter);
router.use('/ingredient', ingredientRouter);

module.exports = router;
