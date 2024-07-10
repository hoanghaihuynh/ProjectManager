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

///socket.IO thong bao cho admin 
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

//sesion
const session = require('express-session');

app.use(session({
    secret: 'admin',
    resave: true,
    saveUninitialized: false
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
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    formatPrice: (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
    totalPrice: (items) => {
      if (Array.isArray(items)) {
        return items.reduce((total, item) => total + item.totalPrice, 0);
      }
      return 0;
    },
    formatDate: (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    }
  }
}));



app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources","views"));

// const router = require('./routes')
// router(app);

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const userName = require('./util/exportUserName');
app.use(userName);
app.use('/admin', adminRouter);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/', userRouter);

//set websocket.io 
app.set('io', io);
io.on('connection', (socket) => {
  console.log('Admin connected to socket.');

  // Nghe sự kiện 'newOrder'
  socket.on('newOrder', (data) => {
      console.log('New order received:', data);
      io.emit('updateOrders', data); // Gửi thông báo cập nhật đơn hàng cho tất cả các client đang kết nối
  });

  socket.on('disconnect', () => {
      console.log('Admin disconnected from socket.');
  });
});
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })
//app.listen chi khoi dong sever cua http còn server.listen khoi dong cho ca socket.io
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});