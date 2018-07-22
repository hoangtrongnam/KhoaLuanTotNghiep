var User = require('./../../models/user');
var LichSu = require('./../../models/Lichsu');
var Tfidf_User = require('./../../models/vector_nguoidung');
// việc thứ nhất tìm hàm count mà từ và ID_user giống nhau thì đếm 

var tinh_tf = User.find({}, (err,user)=>{// lấy tất cả cá ID user 
    if(err)
    {
        console.log('loi lay user tinh tf');
    }
    else{
        user.forEach((user_for)=>{// duyệt tùng ID user chuyền vào
            LichSu.find({ID_user:user_for._id}, {Tu:1}, (err,lichsu)=>{//chọn lấy user duyệt và lấy tất cả các từ user đã đọc
                    lichsu.forEach((ls)=>{//duyệt tùng từ
                        //cần tính tổng từ của user đã đọc
                        LichSu.find({Tu:ls.Tu},(err,tu_user)=>{// chuyền vào một từ và tìm xem user đọc bao nhiêu lần
                            // console.log('count so tu user : ',count_sotu,'      count:',count,'     tu:',ls.Tu);
                            // var tf=count/count_sotu;
                            // console.log(tf);
                            //vì điều kiện là lưu từ db.lichsus.createIndex({Tu:1, ID_baibao:1,ID_user:1}, {unique:true});
                            //=> số lần user đọc từ đó chí là số bài báo mà user đọc chứa từ đó => bằng count
                            // việc tiếp theo xác định xem số bài bào mà user đã đọc
                            //
                            var dem=0;
                            let tong=0;
                            tu_user.forEach((user_tfidf)=>{
                                // console.log(user_for);
                                if(user_tfidf.ID_user==user_for._id)
                                {
                                    dem++;
                                    tong+=user_tfidf.tfidf;
                                }
                            })
                            console.log(tong/dem);
                            // console.log(tong/dem,"             ",dem,user_for._id);
                            //không thể lưu chung bảng từ vì môi user có gí trị khác nhau nhưng chuang 1 từ
                            var tfidf_user = new Tfidf_User();
                            tfidf_user.ID_user=user_for._id;
                            tfidf_user.tu=ls.Tu;//console.log(tfidf_user.Tu);
                            tfidf_user.tfidf_user=tong/dem;
                            tfidf_user.save((err,tfidf)=>{
                                if(err)
                                {
                                    // console.log('loi k luu dc tfidf user',err);
                                }
                                else{
                                    console.log('luu thanh cong tfidf user');
                                }
                            })
                        })
                    })
            })
        })
    }
})
module.exports = {
    tinh_tf
}
