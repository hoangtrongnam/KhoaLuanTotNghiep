const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');

module.exports = (app, passport) => {
    app.get('/nguoimoi', isLoggedIn, (req, res) => {
        BaiBao.find({ $or: [{ TheLoai: 'Giải tríGiải trí' }, { TheLoai: 'Thể thao' }] }, (err, thethao) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({ $or: [{ TheLoai: 'Pháp luật' }, { TheLoai: 'Thời sự' }, { TheLoai: 'Thế giới' }] }, (err, thoisu) => {
                    if (err) {
                        console.log('loi roi khong lay dc thui su', )
                    }
                    else {
                        BaiBao.find({ $or: [{ TheLoai: 'Kinh tế' }, { TheLoai: 'Thông tin doanh nghiệp' }, { TheLoai: 'Kinh doanhKinh doanh' }] }, (err, kinhdoanh) => {
                            if (err) {
                                console.log('loi roi khong lay dc thui su', )
                            }
                            else {
                                BaiBao.find({}, (err, baibao) => {
                                    if (err) {
                                        console.log('loi roi khong lay dc thi truong', )
                                    }
                                    else {
                                        res.render('nguoidung/nguoimoi.ejs', { user: req.user, baibao, thethao, thoisu, kinhdoanh });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
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
