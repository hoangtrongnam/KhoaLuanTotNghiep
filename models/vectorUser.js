const mongoose = require('mongoose');

var tfidf_userSchema = mongoose.Schema;

tfidf_userSchema = mongoose.Schema({
        ID_User:{type:String},
        Tu:{type:String},
        Tfidf_User:{type:Number},
        ThoiGian:{type:Date}
})
// tfidf_userSchema.indexes({tu:1, ID_user:1}, {unique:true});
module.exports = mongoose.model(newFunction(),tfidf_userSchema);

function newFunction() {
    return 'vectorUser';
}
//dùng lệnh này để tạo chỉ mục không cho phép 2 trường lặp lại  db.vector_nguoidungs.createIndex({Tu:1, ID_User:1}, {unique:true});