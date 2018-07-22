const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');
var KetQua = require('./../../models/khoangcach2baiviets');
var KetQua_user = require('./../../models/khoangcachnguoidung_baiviet');
var LichSu = require('./../../models/Lichsu');
var Tu_BaiBao = require('./../../models/vector_baiviet');

module.exports = function (app, passport) {
    app.get('/', (req, res) => {
        BaiBao.find( {$or: [{ TheLoai: 'Giải tríGiải trí' },{ TheLoai: 'Thể thao' }]}, (err, thethao) => {
            if (err) {
                console.log('loi roi khong lay dc thui su', )
            }
            else {
                BaiBao.find({$or: [{ TheLoai: 'Pháp luật' },{ TheLoai: 'Thời sự' },{TheLoai:'Thế giới'}]}, (err, thoisu) => {
                    if (err) {
                        console.log('loi roi khong lay dc thui su', )
                    }
                    else {
                        BaiBao.find({ $or: [{ TheLoai: 'Kinh tế' }, { TheLoai: 'Thông tin doanh nghiệp' }, { TheLoai: 'Kinh doanhKinh doanh' }] }, (err, kinhdoanh) => {
                            if (err) {
                                console.log('loi roi khong lay dc thui su', )
                            }
                            else {
                                // console.log(thoisu)
                                BaiBao.find({}, (err, baibao) => {
                                    if (err) {
                                        console.log('loi roi khong lay dc thui su', )
                                    }
                                    else {
                                        BaiBao.find({ TheLoai: 'Thị trường' }, (err, thiTruong) => {
                                            if (err) {
                                                console.log('loi roi khong lay dc thui su', )
                                            }
                                            else {
                                                res.render('nguoidoc/index.ejs', { thethao, thoisu, kinhdoanh, baibao, thiTruong, baibao });
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                })

            }
        })
    })
};