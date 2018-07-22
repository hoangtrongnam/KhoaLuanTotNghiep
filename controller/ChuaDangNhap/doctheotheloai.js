const express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
ejs = require('ejs');


router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');

module.exports = function(app, passport) {
    app.get('/thoi-su',(req,res)=>{
        BaiBao.find({ $or: [{ TheLoai: 'Phóng sự' }, { TheLoai: 'Thời sự' }] },(err, newlist)=>{
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
                        var t = 'Thời sự';
                        console.log(t)
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/the-gioi',(req, res) => {
        BaiBao.find({TheLoai:'Thế giới'},(err, newlist)=>{
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
                        var t = 'Thế giới';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/goc-nhin',(req, res) => {
        BaiBao.find({TheLoai:'Góc nhìn'},(err, newlist)=>{
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
                        var t = 'Góc nhìn';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/kinh-doanh',(req, res) => {
        BaiBao.find({ $or: [{ TheLoai: 'Kinh tế' }, { TheLoai: 'Thông tin doanh nghiệp' }, { TheLoai: 'Kinh doanhKinh doanh' }] }, (err, newlist) => {        
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
                        var t = 'Kinh doanh';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/giao-duc',(req, res) => {
        BaiBao.find({TheLoai:'Giáo dục'},(err, newlist)=>{
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
                        var t = 'Giáo dục';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/the-thao',(req, res) => {
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
                        var t = 'Thể thao';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/giai-tri',(req, res) => {
        BaiBao.find({TheLoai:'Giải tríGiải trí'},(err, newlist)=>{
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
                        var t = 'Giải trí';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/phap-luat',(req, res) => {
        BaiBao.find({TheLoai:'Pháp luật'},(err, newlist)=>{
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
                        var t = 'Pháp luật';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/suc-khoe',(req, res) => {
        BaiBao.find({TheLoai:'Sức khỏe'},(err, newlist)=>{
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
                        var t = 'Sức khỏe';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/khoa-hoc',(req, res) => {
        BaiBao.find({TheLoai:'Khoa học'},(err, newlist)=>{
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
                        var t = 'Khoa học';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
    app.get('/xe-co',(req, res) => {
        BaiBao.find({TheLoai:'Xe cọ'},(err, newlist)=>{
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
                        var t = 'Xe cọ';
                        res.render('nguoidoc/indexTheLoai',{newlist,listTongHop,t})
                    }
                })
            }
        })
    })
};