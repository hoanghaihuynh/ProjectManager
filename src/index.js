const path = require('path');
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { engine } = require("express-handlebars");
const app = express()
const port = 8000






// tu lam
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const session = require('express-session');

app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true
}));

// Sử dụng bodyParser và cookieParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Sử dụng cookie-parser middleware




const db = require('./config/db')

//connect to db 
db.connect();

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({
  extended:true
}
))
app.use(express.json())

app.use(methodOverride('_method'))

//HTTP logger
  app.use(morgan('combined'))

//template engine
app.engine("hbs", engine({
  extname:'.hbs',
  helpers:{
    sum:( a , b ) => a + b,
  }
}
));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources","views"));

// const router = require('./routes')
// router(app);

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
app.use('/admin', adminRouter);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/', userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})