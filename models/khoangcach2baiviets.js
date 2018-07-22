var mongoose = require('mongoose');

var KetQuaSchema = new mongoose.Schema;

KetQuaSchema = mongoose.Schema({
    id_bai1:{type:String},
    id_bai2:{type:String},
    cosine:{type:Number}
})
// KetQuaSchema.indexes({id_bai1: 1, id_bai2: 1}, { unique: true });
module.exports = mongoose.model('khoangcach2baiviets',KetQuaSchema);
// hai bài báo thì chỉ được lưu 1 lần tính nếu có rồi thì cập nhật chứ k được lưu nên dùng 
// hàm db.khoangcach2baiviets.createIndex({id_bai1:1, id_bai2:1}, {unique:true});