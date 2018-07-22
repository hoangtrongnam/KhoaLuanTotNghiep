const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');
var KhoangCachBaiViet = require('./../../models/khoangcach2baiviets');
var KhoangCachNguoiDung_BaiViet = require('./../../models/khoangcachnguoidung_baiviet');
var LichSu = require('./../../models/Lichsu');
var Vector_BaiViet = require('./../../models/vector_baiviet');
var Vector_Nguoidung = require('../../models/vector_nguoidung');
var constant = require('./../../config/constant');
require('x-date') ;
module.exports = (app, passport) => {
    // LOGOUT ==============================
    app.get('/dangxuat', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/loigiday', isLoggedIn, async (req, res) => {
        var data = [];
        var time;
        var lichSu = await LichSu.find({ID_user: req.user._id}).sort({ThoiGian:-1});
        for(var item of lichSu)
        {
            var listLichSu = await BaiBao.findById({_id:item.ID_baibao});
            data.push(listLichSu);
        }
        console.log(time)
        
        await res.render('nguoidung/xemlichsu.ejs',{data, user: req.user, lichSu})
    })

    //show trang login
    app.get('/dangnhap', function (req, res) {
        res.render('admin/login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/dangnhap', passport.authenticate('local-login', {
        successRedirect: '/index', // chuyển hướng đế trang index
        failureRedirect: '/', // chuyển hướng trở lại trang đăng nhập nếu có lỗi
        failureFlash: true // cho phép thông báo
    }));


    
    // process the login form
    //passport.authenticate và xác định xem thành phần nào của đối tượng sẽ lưu vào trong session
    //Kết quả của hàm này là ta sẽ có đối tượng req.session.passport.user = các thông tin ta truyền vào trong serializeUser.
    //user.id. Đồng thời với trên passport cũng có gắn thông tin user vào req.user.
    app.post('/dangnhap', passport.authenticate('local-login', {
        successRedirect: '/index', // chuyển hướng đế trang index
        failureRedirect: '/', // chuyển hướng trở lại trang đăng nhập nếu có lỗi
        failureFlash: true // cho phép thông báo
    }));
    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/index',
        failureRedirect: '/'
    }));
    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback', passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


};
// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())// hàm kiểm tra xem người dùng có đang đăng nhập hay không khi lướt qua các trang khác
    {
        return next();
    }
    res.redirect('/');
}

