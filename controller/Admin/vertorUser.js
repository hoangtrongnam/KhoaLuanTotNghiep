var TuUser = require('./../../models/vectorUser');
var Vector = require('./../../models/vector_nguoidung');

var TaoVectorUser = async function () {
    // trả ra số lần đọc từ đó và trung bình đoc
    var table = await TuUser.aggregate([
        {
            $group: {
                _id: {
                    "UserID": "$ID_User",
                    "tu": "$Tu"
                },
                // SoLanDoc: { $sum: 1 },
                avg_Tfidf_User: { $avg: "$Tfidf_User" }
            }
        }
    ]);

    for (var i in table) {
        // console.log(table[i])
        var vector_nguoidung = new Vector();
        vector_nguoidung.ID_User = table[i]._id.UserID;
        vector_nguoidung.Tu = table[i]._id.tu;
        vector_nguoidung.Tfidf_User = table[i].avg_Tfidf_User;
        vector_nguoidung.ThoiGian = new Date();
        vector_nguoidung.save((err,tfidf,next)=>{
            if(err)
            {
                if(err.code===11000){
                    console.log(table[i].avg_Tfidf_User)
                    // Vector.update([{ Tu:table[i]._id.tu},{ID_User : table[i]._id.UserID}], { Tfidf_User : table[i].avg_Tfidf_User }, function (err, raw) {
                    //     if (err) {
                            // console.log(err);
                    //     }
                    //     else{
                    //         // console.log('phan hoi kq ', raw);
                    //     }
                    // });
                }
                else{
                    console.log('loi k luu dc tfidf user');
                }
            }
            else{
                console.log('luu thanh cong tfidf user');
            }
        })
    }
}
module.exports = {
    TaoVectorUser
}