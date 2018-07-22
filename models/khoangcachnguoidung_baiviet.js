var mongoose = require('mongoose');

var KetQua_userSchema = new mongoose.Schema;

KetQua_userSchema = mongoose.Schema({
    ID_user:{type:String},
    id_bai:{type:String},
    cosine:{type:Number}
})
// KetQua_userSchema.indexes({ID_user:1, id_bai:1}, {unique:true});
module.exports = mongoose.model('khoangcachnguoidung_baiviet',KetQua_userSchema);
// hai bài báo thì chỉ được lưu 1 lần tính nếu có rồi thì cập nhật chứ k được lưu nên dùng 
// hàm db.khoangcachnguoidung_baiviets.createIndex({ID_user:1, id_bai:1}, {unique:true});