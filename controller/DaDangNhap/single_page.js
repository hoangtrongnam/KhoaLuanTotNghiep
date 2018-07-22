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
var VectorUser = require('./../../models/vectorUser');
var constant = require('./../../config/constant');

module.exports = (app, passport) => {
    app.get('/content/:id', isLoggedIn, (req, res, next) => {
        var id = req.params.id;
        var arrKhoangCachBaiViet = [];
        var arrKhoangCachNguoiDung_BaiViet = [];
        BaiBao.findById(req.params.id).then(async (noidung) => {
            var vectorUser = await Vector_BaiViet.find({ id_bai: id });
            for (var i in vectorUser) {
                if (vectorUser[i].tfidf > constant.constantTfidf) {
                    var _VectorUser = new VectorUser();
                    _VectorUser.ID_User = req.user._id;
                    _VectorUser.Tu = vectorUser[i].tu;
                    _VectorUser.Tfidf_User = vectorUser[i].tfidf;
                    _VectorUser.ThoiGian = new Date();
                    await _VectorUser.save((err,data)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                            console.log("them vector thanh cong!")
                        }
                    });
                }
            }

            var lichsu = new LichSu();
            lichsu.ID_user = req.user._id;
            lichsu.ID_baibao = id;
            lichsu.ThoiGian = new Date();
            // console.log(tbb.tfidf);
            //một từ của một văn bản chỉ được lưu 1 lần db.lichsus.createIndex({Tu:1, ID_baibao:1,ID_user:1}, {unique:true});
            await lichsu.save((err, lich_su) => {
                if (err) {
                    console.log('loi k luu duoc lich su:');
                }
                else {
                    console.log('luu lich su doc thanh cong!');
                }
            })

            // var KhoangCachBaiViet = await KhoangCachBaiViet.find({ id_bai1:req.params.id }).limit(10).sort({ consine: -1 });
            var rec = await KhoangCachBaiViet.find({ id_bai1: req.params.id }).sort({ cosine: -1 });
            for (let element of rec) {
                var kq = await BaiBao.findOne({ _id: element.id_bai2 })
                arrKhoangCachBaiViet.push(kq)
            }
            var consine = await KhoangCachNguoiDung_BaiViet.find({ ID_user: req.user._id }).limit(20).sort({ consine: -1 });
            for (let element of consine) {
                var kq = await BaiBao.find({ _id: element.id_bai });
                arrKhoangCachNguoiDung_BaiViet.push(kq);
            }
            // console.log(arrKhoangCachNguoiDung_BaiViet)
            var TheLoai = await BaiBao.find({ TheLoai: noidung.TheLoai });
            res.render('nguoidung/pages/single_page.ejs', { noidung, tinLienQuan: arrKhoangCachBaiViet, user: req.user, arrKhoangCachNguoiDung_BaiViet, TheLoai });
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

