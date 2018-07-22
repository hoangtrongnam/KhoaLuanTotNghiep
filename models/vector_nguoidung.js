const mongoose = require('mongoose');
var tfidf_userSchema = mongoose.Schema;

tfidf_userSchema = new mongoose.Schema({
        ID_User:{type:String},
        Tu:{type:String},
        Tfidf_User:{type:Number},
        ThoiGian:{type:Date}
});

module.exports = mongoose.model('vector_nguoidung', tfidf_userSchema);

//dùng lệnh này để tạo chỉ mục không cho phép 2 trường lặp lại  db.vector_nguoidungs.createIndex({Tu:1, ID_User:1}, {unique:true});