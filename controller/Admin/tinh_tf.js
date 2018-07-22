var BaiBao = require('./../../models/bai_bao');
var Tu = require('./../../models/vector_baiviet');
var IDFTU = require('./../../models/tu');
var fs = require('fs');

var dem = 0;
var arr = '';
var tf = 0;
var readFileTuDien;
var arrTuDien;
// var start = new Date(2010, 11, 1);
// var end = Date.now();
var start = new Date();
start.setHours(0, 0, 0, 0);
console.log(start)
var end = new Date();
end.setHours(23, 59, 59, 999);
console.log(end);

var arr = Array();
var TinhTF = async function () {
    var baiBao = await BaiBao.find({}, { NoiDung_text: 1 });
    try {
        readFileTuDien = fs.readFileSync('a.txt', 'utf8');
    }
    catch (e) {
        console.log('Error:', e.stack);
    }
    arrTuDien = readFileTuDien.split('\r\n');
    for (var noidung of baiBao) {
        //them tu don vao arr
        arr = noidung.NoiDung_text.split(" ");
        //dem so tu trong mot bai viet
        var spaceCount = arr.length;
        // console.log(spaceCount);
        //them tu ghep vao arr
        for (i = 0; i < spaceCount - 1; i++) {
            var res = noidung.NoiDung_text.split(" ")
            var t = res.slice(i, i + 2)
            var s = t.join(' ');
            arr.push(s);
        }
        for (var i in arr) {
            // console.log(arr[i])
            if (arr[i] != "") {
                if (arrTuDien.includes(arr[i]) == true) {
                    for (var j = i + 1 in arr) {
                        if (arr[i].toLowerCase() == arr[j].toLowerCase()) {
                            dem++;
                        }
                        //nếu nó không bằng nhau thì lưu lại và cho nó là 1
                    }
                    //tính td thì lấy số lần xuất hiện chia chiều dài văn bản
                    var length_arr = arr.length;
                    tf = dem / length_arr;
                    //trong một văn bản thì từ đó không được lưu trên 2 lần nên cần phải sữ dụng
                    //db.vector_baiviets.createIndex({id_bai:1 , tu:1},{unique:1})Tạo bảng trước
                    //lưu xuống
                    var tf_tu = new Tu();
                    tf_tu.id_bai = noidung._id;
                    tf_tu.tu = arr[i].toLowerCase();
                    tf_tu.so_xuat_hien = dem;
                    tf_tu.tf = tf;
                    console.log(tf_tu)
                    tf_tu.save((err, tu) => {
                        if (err) {
                            console.log('loi', err);
                        }
                        else {
                            console.log('them thanh cong!');
                        }
                    })
                    dem = 0;
                }
            }
        }
    }
}


var TF = async function (baiviet, id) {
    var ArrTu = await IDFTU.find({});
    try {
        readFileTuDien = fs.readFileSync('a.txt', 'utf8');
    }
    catch (e) {
        console.log('Error:', e.stack);
    }
    arrTuDien = readFileTuDien.split('\r\n');
    //them tu don vao arr
    arr = baiviet.split(" ");
    //dem so tu trong mot bai viet
    var spaceCount = arr.length;
    // console.log(spaceCount);
    //them tu ghep vao arr
    for (i = 0; i < spaceCount - 1; i++) {
        var res = baiviet.split(" ")
        var t = res.slice(i, i + 2)
        var s = t.join(' ');
        arr.push(s);
    }
    for (var i in arr) {
        // console.log(arr[i])
        if (arr[i] != "") {
            if (arrTuDien.includes(arr[i]) == true) {
                for (var j = i + 1 in arr) {
                    if (arr[i].toLowerCase() == arr[j].toLowerCase()) {
                        dem++;
                    }
                    //nếu nó không bằng nhau thì lưu lại và cho nó là 1
                }
                //tính td thì lấy số lần xuất hiện chia chiều dài văn bản
                var length_arr = arr.length;
                tf = dem / length_arr;
                //trong một văn bản thì từ đó không được lưu trên 2 lần nên cần phải sữ dụng
                //db.vector_baiviets.createIndex({id_bai:1 , tu:1},{unique:1})Tạo bảng trước
                //lưu xuống
                for (var ItemTu of ArrTu) {
                    if (ItemTu.tu === arr[i].toLowerCase()) {
                        var t = ItemTu.idf * tf;
                        var tf_tu = new Tu();
                        tf_tu.id_bai = id;
                        tf_tu.tu = arr[i].toLowerCase();
                        tf_tu.so_xuat_hien = dem;
                        tf_tu.tf = tf;
                        tf_tu.tfidf = t;
                        console.log(tf_tu)
                        tf_tu.save((err, tu) => {
                            if (err) {
                                console.log('loi', err);
                            }
                            else {
                                console.log('them thanh cong!');
                            }
                        })
                    }
                }
                dem = 0;
            }
        }
    }
}


module.exports = {
    TinhTF,
    TF
}