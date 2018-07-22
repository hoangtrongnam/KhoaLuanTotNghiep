const express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');

module.exports = function(app, passport) {
    app.get('/the-thao',(req,res)=>{
        BaiBao.find({TheLoai:'Thể thao'},(err, newlist)=>{
            if(err)
            {
                console.log('loi roi khong lay dc thui su',)
            }
            else{
                BaiBao.find({},(err,listTongHop)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop})
                    }
                })
            }
        })
    })
};