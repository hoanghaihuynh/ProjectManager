
// module.exports = routerU;
const express = require('express');
const router = express.Router();



const homeRouter = require('./home');
const menuRouter = require('./menu');
const orderRouter = require('./order');
const contactRouter = require('./contact');
const aboutUsRouter = require('./aboutUs');
const authToken = require('../../util/authenticateToken')

// Sử dụng các router

router.use('/',authToken, homeRouter);
router.use('/menu',authToken, menuRouter);
router.use('/order',authToken, orderRouter);
router.use('/contact',authToken, contactRouter);
router.use('/aboutUs',authToken, aboutUsRouter);


module.exports = router;