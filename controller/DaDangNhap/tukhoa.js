var fs = require('fs');
const vector_baiviet = require('./../../models/vector_baiviet');
const ChonTu_User = require('./../../models/vector_nguoidung');

module.exports = function(app, passport) {
    app.get('/chontu', isLoggedIn, async function(req, res) {
        var StrTu=null;
       var strTu = await vector_baiviet.find({}, {tu:1,tfidf:1}, {sort: {'tfidf': -1}}).limit(1000);
        for(var i of strTu)
        {
            StrTu += i.tu+',';
        }
        console.log(StrTu)
        var vector_user = await ChonTu_User.find({ID_User:req.user._id},{}, {sort: {ThoiGian: -1}, limit: 100});
        res.render('nguoidung/chontukhoa.ejs', {strTu, user: req.user, vector_user});
    });

    app.get('/action', isLoggedIn,(req,res)=>{
        tukhoa = req.query.tukhoa;
        var string = tukhoa;
        mang = tukhoa.split(', ');
        for( let i in mang)
        {
            if(mang[i] != '')
            {
                var tuChon = new ChonTu_User();
                tuChon.ID_User = req.user._id;
                tuChon.Tu = mang[i];
                tuChon.Tfidf_User = 1;
                tuChon.ThoiGian = new Date();
                tuChon.save((err,tu)=>{
                    if(err)
                    {
                        // console.log(mang[i],'===========');
                        if(err.code===11000){
                            //console.log("lỗi từ đã tồn tại");
                            //cập nhật lại các giá trị của từ
                            //console.log(idf + 'là gia tri idf, ' + 'gia tri chua tu: ' + count);
                            // console.log(err);
                            // ChonTu_User.update({ Tu:mang[i]}, { ID_User : req.user._id, Tfidf_User:1,ThoiGian:new Date() }, { multi: true }, function (err, raw) {
                            ChonTu_User.update({$and: [{ Tu:mang[i]},{ ID_User : req.user._id}]}, { Tfidf_User:1,ThoiGian:new Date() }, { multi: true }, function (err, raw) {    
                                if (err) {
                                    return handleError(err);
                                }
                                else{
                                    console.log('phan hoi kq ', raw);
                                }
                            });
                        }
                        else{
                            console.log('lỗi gì đâu đó rồi!');
                        }
                    }
                    else{
                        console.log("them thanh cong!");
                    }
                })
            }
        }
        res.redirect('/chontu');
    })

    app.get('/delete/:id', isLoggedIn,(req,res)=>{
        var id=req.params.id;
        console.log(id);
        ChonTu_User.findByIdAndRemove(req.params.id, (err, vector_user) => {  
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            res.redirect('/chontu');
        });
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