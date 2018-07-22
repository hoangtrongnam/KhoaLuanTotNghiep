const mongoose = require('mongoose');
var articleSchema = mongoose.Schema;

articleSchema = new mongoose.Schema({
        TieuDe:{type:'String',required:true},
        NoiDung_text:{type:'String', required:true},
        NoiDung_html:{type:'String', required:true},
        Hinh:{type:String, required:true},
        Link:{type:String, required:true, unique:true},
        TheLoai:{type:String,required:true, index:true},
        ThoiGian:{type:Date,require:true}
});

module.exports = mongoose.model('BaiBao', articleSchema);
