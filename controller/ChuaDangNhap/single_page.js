const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');
var KhoangCachBaiViet = require('./../../models/khoangcach2baiviets');

module.exports = function (app, passport) {

    app.get('/noidung/:id',  function(req,res, next){
        var arr = [];
        BaiBao.findById(req.params.id).then(async function(baibao){
            var rec = await KhoangCachBaiViet.find({id_bai1 : req.params.id}).sort({ cosine: -1 });       
            for (let element of rec)
            {
                var kq = await BaiBao.findOne({_id : element.id_bai2})
                arr.push(kq)
            }
            var TheLoai = await BaiBao.find({TheLoai : baibao.TheLoai});  
            return res.render('nguoidoc/pages/single_page.ejs', {baibao, data: arr,TheLoai});
        })

    })
};
