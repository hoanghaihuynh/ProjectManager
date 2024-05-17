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
// Sử dụng bodyParser và cookieParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Sử dụng cookie-parser middleware






//login
//const bcrypt = require("bcrypt");

//use EJS as the view engine
//app.set('view engine','ejs');





const router = require('./routes')
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

router(app);




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})