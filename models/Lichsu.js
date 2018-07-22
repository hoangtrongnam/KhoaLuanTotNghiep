var mongoose = require('mongoose');

var LichSuSchema = new mongoose.Schema;

LichSuSchema = mongoose.Schema({
    ID_user: {type: String},
    ID_baibao:{type: String},
    ThoiGian: {type: Date}
});
module.exports = mongoose.model('Lichsu', LichSuSchema);