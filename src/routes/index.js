const ingredientRouter = require('./ingredient')
const meRouter = require('./me')
const siteRouter = require('./site')
const munuRouter = require('./menu')
const staffRouter = require('./staff')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
function  router(app){
    app.use('/logout',logoutRouter)
    app.use('/login',loginRouter)
    app.use('/Menu',munuRouter)
    app.use('/',siteRouter)
    app.use('/me',meRouter)
    app.use('/staff',staffRouter)
    app.use('/ingredient',ingredientRouter)
}

module.exports = router;