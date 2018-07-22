const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const body = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const app = express();
//user
const bodyParser = require('body-parser');
var passport = require('passport');// Hỗ trợ xác thực người dùng với các phương thức khác nhau.
var flash = require('connect-flash');// Sử dụng để tạo ra các flash messages.
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const https = require('https');
let options = {};
var CronJob = require('cron').CronJob;
require('./config/passport')(passport); // pass passport for configuration

app.set('view engine', 'ejs'); // chỉ định view engine là ejs
app.use(body.json());

// const port = process.env.PORT || 3000;
const port = 3000;
mongoose.Promise = global.Promise;

var db = require('./config/db');

mongoose.connect(db.url, { useMongoClient: true }, (err) => {
    console.log('ket noi thanh cong!');
});

app.use(express.static(path.join(__dirname, 'controller/CrawlDB')));


///
//==============================================================

// Cấu hình ứng dụng express
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser.json()); // lấy thông tin từ form HTML
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// routes =====================================================================
// app.use('dangky', require('./controller/dangky')(app, passport)); // load our routes and pass in our app and fully configured passport



//================================================================
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/nguoidoc')));
app.use(express.static(path.join(__dirname, 'views/nguoidung')));
app.use(express.static(path.join(__dirname, 'views/admin')));

require('./controller/ChuaDangNhap/dangky')(app, passport);

require('./controller/DaDangNhap/nguoimoi')(app, passport);

require('./controller/ChuaDangNhap/index')(app, passport);

require('./controller/ChuaDangNhap/single_page')(app, passport);

require('./controller/ChuaDangNhap/doctheotheloai')(app, passport);

require('./controller/ChuaDangNhap/TheThao')(app, passport);

require('./controller/DaDangNhap/dangnhap.js')(app, passport);

require('./controller/DaDangNhap/index')(app, passport);

require('./controller/DaDangNhap/single_page')(app, passport);

require('./controller/DaDangNhap/doctheotheloai')(app, passport);

require('./controller/DaDangNhap/tukhoa')(app, passport);

require('./controller/AdminQuanLy/login')(app, passport);

var CrawlDBLaoDong = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        require('./controller/CrawlDB/CrawlerDBLaoDong');
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

var CrawlDBVNExpress = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        require('./controller/CrawlDB/CrawlDBVNExpress');
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

var TinhTF = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        var controllerTinh = require('./controller/Admin/tinh_tf');
        controllerTinh.TinhTF();
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

var TinhIDF = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        var controllerTinh = require('./controller/Admin/tinh_idf');
        controllerTinh.TinhIDF();
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

var TinhTFIDF = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        var controllerTinh = require('./controller/Admin/tinh_tfidf');
        controllerTinh.TinhTFIDF();
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

// var TinhCosineBaiViet = new CronJob({
//     cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
//     onTick: function () {
//         var controllerTinh = require('./controller/Admin/tinh_cosine');
//         // controllerTinh.TinhKhoangCachHaiBaiViet();
//     },
//     start: false,
//     timeZone: 'Asia/Ho_Chi_Minh'
// });
var TinhCosineBaiViet = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        var controllerTinh = require('./controller/Admin/tinh_cosine');
        // controllerTinh.TinhKhoangCachHaiBaiViet();
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

var TinhVetorUser = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        var controllerTaoVector = require('./controller/Admin/vertorUser');
        controllerTaoVector.TaoVectorUser();
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});
//

var TinhCosineUser = new CronJob({
    cronTime: '* * * * * *',       // xét đến 21:12 đêm thì nó sẽ tự động chạy function
    onTick: function () {
        require('./controller/Admin/tinh_cosine_user');
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});

// CrawlDBLaoDong.start();
// CrawlDBVNExpress.start();
// TinhTF.start();
// TinhIDF.start();
// TinhTFIDF.start();
// TinhCosineBaiViet.start();
// TinhVetorUser.start();
// TinhCosineUser.start();
// var server = https.createServer(options, app);



app.listen(port, () => {
    console.log('kết nối thành công!', port);
});
module.exports = app;
