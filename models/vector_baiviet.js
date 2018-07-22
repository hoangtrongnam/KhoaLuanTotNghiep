const mongoose =  require('mongoose');

var TuSchema = mongoose.Schema;

TuSchema = mongoose.Schema({
        id_bai:{type:String},
        tu:{type:String},
        so_xuat_hien:{type:Number},
        tf:{type:Number},
        tfidf:{type:Number}
})
// TuSchema.indexes({ tu:1, id_bai: 1}, {unique: true});          
module.exports = mongoose.model('vector_baiviet',TuSchema);
//dùng lệnh này để tạo chỉ mục không cho phép 2 trường lặp lại  db.vector_baiviets.createIndex({tu:1, id_bai:1}, {unique:true});