const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');

module.exports = function (app, passport) {
    app.get('/thoisu', isLoggedIn, (req, res) => {
        BaiBao.find({ $or: [{ TheLoai: 'Phóng sự' }, { TheLoai: 'Thời sự' }] }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Thời sự';
                        console.log(listTongHop)
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/thegioi', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Thế giới' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Thế giới';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/gocnhin', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Góc nhìn' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Góc nhìn';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/kinhdoanh', isLoggedIn, (req, res) => {
        BaiBao.find({ $or: [{ TheLoai: 'Kinh tế' }, { TheLoai: 'Thông tin doanh nghiệp' }, { TheLoai: 'Kinh doanhKinh doanh' }] }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Kinh doanh';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/giaoduc', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Giáo dục' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Giáo dục';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/thethao', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Thể thao' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Thể thao';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/giaitri', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Giải tríGiải trí' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Giải trí';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/phapluat', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Pháp luật' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Pháp luật';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/suckhoe', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Sức khỏe' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Sức khỏe';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/khoahoc', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Khoa học' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Khoa học';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
    app.get('/xeco', isLoggedIn, (req, res) => {
        BaiBao.find({ TheLoai: 'Xe' }, (err, newlist) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({}, (err, listTongHop) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var t = 'Xe cọ';
                        res.render('nguoidung/indexTheLoai', { newlist, listTongHop, t, user: req.user })
                    }
                })
            }
        })
    })
};
// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())// hàm kiểm tra xem người dùng có đang đăng nhập hay không khi lướt qua các trang khác
    {
        return next();
    }
    res.redirect('/');
}