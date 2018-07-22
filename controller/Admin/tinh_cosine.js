var BaiBao = require('./../../models/bai_bao');
var vector_BaiViet = require('./../../models/vector_baiviet');
var KetQua = require('./../../models/khoangcach2baiviets');
var math = require('mathjs');

var l1 = 0;
var l2 = 0;
var s = 0;
var array = [];
// var tinh_cosine = BaiBao.find({}).then(async (bai) => {
//   bai.forEach((d) => {
//     array.push(d._id);
//   })
//   for (var i = 0; i < array.length - 1; i++) {
//     var vector_BaiViet_i = await vector_BaiViet.find({ id_bai: array[i] });
//     for (var j = i + 1; j < array.length; j++) {
//       var vector_BaiViet_j = await vector_BaiViet.find({ id_bai: array[j] });
//       for (let element_i of vector_BaiViet_i) {
//         for (let element_j of vector_BaiViet_j) {
//           if (element_i.tu == element_j.tu & element_j.id_bai == array[j]) {
//             s += element_i.tfidf * element_j.tfidf;
//           }
//           l1 += element_j.tfidf * element_j.tfidf;
//         }
//         l2 += element_i.tfidf * element_i.tfidf;
//       }
//       var ketqua = s / (math.sqrt(l1) * math.sqrt(l2));
//       console.log(ketqua);
//       if (ketqua > 0.00003) {
//         // console.log(ketqua,'===============',x,'=================',y);
//         var _KetQua = new KetQua();
//         _KetQua.id_bai1 = array[i];
//         _KetQua.id_bai2 = array[j];
//         _KetQua.cosine = ketqua;
//         _KetQua.save((err, ketquas) => {
//           if (err) {
//             console.log('loi roi');
//           }
//           else {
//             console.log('them thanh cong!');
//           }
//         })
//       }
//       l1 = 0;
//       l2 = 0;
//       s = 0;
//     }
//   }
// })

// //tinh góc giữa 2 bài

// var l1 = 0;
// var l2 = 0;
// var s = 0;
// var array = [];
// var TinhKhoangCachHaiBaiViet = async function () {
//   var baiBao = await BaiBao.find({});
//   for (var i of baiBao) {
//     array.push(i._id);
//   }
//   for (var i = 0; i < array.length - 1; i=i+1) {
//     var vector_BaiViet_i = await vector_BaiViet.find({ id_bai: array[i] });
//     for (var j = i + 1; j < array.length; j++) {
//       var vector_BaiViet_j = await vector_BaiViet.find({ id_bai: array[j] });
//       for (let element_i of vector_BaiViet_i) {
//         for (let element_j of vector_BaiViet_j) {
//           if (element_i.tu == element_j.tu & element_j.id_bai == array[j]) {
//             s += element_i.tfidf * element_j.tfidf;
//           }
//           l1 += element_j.tfidf * element_j.tfidf;
//         }
//         l2 += element_i.tfidf * element_i.tfidf;
//       }
//       var ketqua = s / (math.sqrt(l1) * math.sqrt(l2));
//       console.log(ketqua)
//       if (ketqua > 0.00003) {
//         var _KetQua = new KetQua();
//         _KetQua.id_bai1 = array[i];
//         _KetQua.id_bai2 = array[j];
//         _KetQua.cosine = ketqua;
//         _KetQua.save((err, ketquas) => {
//           if (err) {
//             console.log('loi roi');
//           }
//           else {
//             console.log('them thanh cong!');
//           }
//         })
//       }
//       l1 = 0;
//       l2 = 0;
//       s = 0;
//     }
//   }
// }

var KhoangCachHaiBaiViet = async function (id) {
  var baiBao = await BaiBao.find({});
  for (var i of baiBao) {
    array.push(i._id);
  }
  var vector_BaiViet_i = await vector_BaiViet.find({ id_bai: id });
  for (var j = 0; j < array.length; j++) {
    var vector_BaiViet_j = await vector_BaiViet.find({ id_bai: array[j] });
    for (let element_i of vector_BaiViet_i) {
      for (let element_j of vector_BaiViet_j) {
        if (element_i.tu == element_j.tu & element_j.id_bai == array[j]) {
          s += element_i.tfidf * element_j.tfidf;
        }
        l1 += element_j.tfidf * element_j.tfidf;
      }
      l2 += element_i.tfidf * element_i.tfidf;
    }
    var ketqua = s / (math.sqrt(l1) * math.sqrt(l2));
    if (ketqua > 0.00003) {
      var _KetQua = new KetQua();
      _KetQua.id_bai1 = id;
      _KetQua.id_bai2 = array[j];
      _KetQua.cosine = ketqua;
      console.log(_KetQua)
      _KetQua.save((err, ketquas) => {
        if (err) {
          console.log('loi roi');
        }
        else {
          console.log('them thanh cong!');
        }
      })
    }
    l1 = 0;
    l2 = 0;
    s = 0;
  }
}
module.exports = {
  KhoangCachHaiBaiViet,
  // tinh_cosine
}
