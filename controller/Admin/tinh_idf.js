var BaiBao=require('./../../models/bai_bao');
var Tu=require('./../../models/vector_baiviet');
var IDF=require('./../../models/tu');
const math = require("mathjs");

var TinhIDF = async function() 
{
    var idf =0;
    var SoBaiBao = await BaiBao.count({});
    var ArrTu = await Tu.distinct('tu',{},(err,tu)=>{});
    for (var element of ArrTu ) {
        var SoBaiChuaTu = await Tu.count({tu:element})
        // console.log(SoBaiChuaTu)
        idf = math.log10(SoBaiBao/SoBaiChuaTu);
        var idf_tu = new IDF();
        idf_tu.idf = idf;
        idf_tu.tu = element;
        idf_tu.so_bai_chua_tu = SoBaiChuaTu;
        idf_tu.save((err,tu)=>{
            if(err)
            {
                if(err.code===11000){
                    //console.log("lỗi từ đã tồn tại");
                    //cập nhật lại các giá trị của từ
                    var idf_update = math.log10(SoBaiBao/SoBaiChuaTu);
                    console.log(idf_update,);
                    IDF.update({ tu:element}, { idf:idf_update,so_bai_chua_tu:SoBaiChuaTu }, { multi: true }, function (err, raw) {
                        if (err) {
                            return handleError(err);
                        }
                        else{
                            console.log('phan hoi kq ', raw);
                        }
                    });
                }
                else{
                    console.log('lỗi gì đâu đó rồi!');
                }
            }
            else{
                console.log('từ chưa tồn tại lưu thành công!');
            }
        })
    }
}
module.exports={
    TinhIDF
}