
// module.exports = routerU;
const express = require('express');
const router = express.Router();



const homeRouter = require('./home');
const menuRouter = require('./menu');
const authToken = require('../../util/authenticateToken')

// Sử dụng các router

router.use('/',authToken, homeRouter);
router.use('/menu',authToken, menuRouter);

module.exports = router;