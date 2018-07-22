const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));
var BaiBao = require('./../../models/bai_bao');
var KhoangCachNguoiDung_BaiViet = require('./../../models/khoangcachnguoidung_baiviet');

module.exports = (app, passport) => {
    var arr = [];
    app.get('/index', isLoggedIn, async (req, res) => {
        var rec = await KhoangCachNguoiDung_BaiViet.find({ ID_user: req.user._id });
        for (var item of rec) {
            var kq = await BaiBao.findById({ _id: item.id_bai });
            arr.push(kq)
        }
        await res.render('nguoidung/index.ejs', { user: req.user, arr})
    })
}

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())// hàm kiểm tra xem người dùng có đang đăng nhập hay không khi lướt qua các trang khác
    {
        return next();
    }
    res.redirect('/');
}
