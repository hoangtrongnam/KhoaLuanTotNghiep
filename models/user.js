const mongoose = require('mongoose');

var bcrypt   = require('bcrypt-nodejs');

var TraSuaSchema = new mongoose.Schema({
    local:{
        TenKH:
        {
            type:String,
            validate: {
                validator: function(v){
                return /^[0-9 aáàạảãăắằặẳẵâấầậẩẫbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyAÁÀẠẢÃĂẮẰẶẲẴÂẤẦẬẨẪBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXY]+$/.test(v) && v.length > 1 && v.length < 50
                },
                message: 'tên chỉ chứa ký tự (a-z) và số (0-9) và chiều dài lợp lệ là 2-50 ký tự!'
        }
        },
        Email:
        {
            type:String,
            validate: {
                validator: function(v){
                return /^[0-9a-zA-Z@_.]+$/.test(v)
                },
                message: 'Email không hợp lệ! Email thường có định dạng VD:abc@gmail.com'
            },
            unique:true
        },
        PassWord:
        {
            type:String,
        },
        SDT:
        {
            type:String,
            validate: {
                validator: function(v){
                return /^[0-9]+$/.test(v) && v.length > 9 && v.length < 12
                },
                message: 'Số điện thoại không hợp lệ!'
            }
        },
        DiaChi:{type:String}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
})

//tạo ra mã hash
TraSuaSchema.methods.generateHash = function(PassWord) {
    return bcrypt.hashSync(PassWord, bcrypt.genSaltSync(8), null);
};

// kiểm tra mật khẩu hợp lệ
TraSuaSchema.methods.validPassword = function(PassWord) {
    return bcrypt.compareSync(PassWord, this.local.PassWord);
};

module.exports = mongoose.model('User',TraSuaSchema);