var BaiBao=require('./../../models/bai_bao');
var Tu=require('./../../models/vector_baiviet');
var KetQua_user=require('./../../models/khoangcachnguoidung_baiviet');
var User = require('./../../models/user');
var Tfidf_user= require('./../../models/vector_nguoidung');
var math=require('mathjs');
var constant = require('./../../config/constant');

//tinh góc giữa 2 bài
var tinh_cosine_user = User.find({},(err,user)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        user.forEach((user)=>
        {
            Tfidf_user.find({ID_User:user._id},(err,tfidf_user)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    // console.log(tfidf_user);
                    BaiBao.find({},(err,baibao)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                            var l1=0;
                            var l2=0;
                            var s = 0;
                            var x;
                            var y;
                            baibao.forEach((baibao)=>{
                                Tu.find({id_bai:baibao._id},(err,tu_baibao)=>{
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else{
                                        tfidf_user.forEach((tfidf_user_1)=>{
                                            l1+=tfidf_user_1.Tfidf_User*tfidf_user_1.Tfidf_User;
                                            y=tfidf_user_1.ID_User;
                                            // console.log(tfidf_user_1)
                                            // console.log('l1',l1);
                                            tu_baibao.forEach((tu_baibao_1)=>{
                                                // console.log(tfidf_user_1.Tu);
                                                if(tfidf_user_1.Tu==tu_baibao_1.tu)
                                                {
                                                    s+=tfidf_user_1.Tfidf_User*tu_baibao_1.tfidf;
                                                    // console.log(s);
                                                }
                                            })
                                        })
                                        tu_baibao.forEach((tu_baibao_1)=>{
                                            l2+=tu_baibao_1.tfidf*tu_baibao_1.tfidf;
                                            x=tu_baibao_1.id_bai;
                                            // console.log(l2);
                                        })
                                        // console.log(l2);
                                        var ketqua=s/(math.sqrt(l1)*math.sqrt(l2));
                                        // console.log(ketqua);
                                        if(ketqua>constant.constantConsine)
                                        {
                                            console.log(ketqua,'====================',x,'                   ',y);
                                            var _KetQua = new KetQua_user();
                                            _KetQua.ID_user = y;
                                            _KetQua.id_bai = x;
                                            _KetQua.cosine = ketqua;
                                            _KetQua.save((err,ketquas)=>{
                                              if(err)
                                              {
                                                console.log('loi roi');
                                              }
                                              else{
                                                console.log('them thanh cong!');
                                              }
                                            })
                                        }
                                        l1=0;
                                        l2=0;
                                        s=0;
                                    }
                                })
                            })
                        }
                    })
                }
            })
        })
    }
})
module.exports={
  tinh_cosine_user
}
