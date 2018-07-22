const mongoose = require('mongoose');

var IdfSchema = mongoose.Schema;
 
IdfSchema = new mongoose.Schema({
        idf:{type:Number},
        tu:{type:String, index: true, unique:true},
        so_bai_chua_tu:{type:Number}
})
module.exports = mongoose.model('tu',IdfSchema);