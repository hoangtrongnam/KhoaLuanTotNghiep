
var vector_baiviet=require('./../../models/vector_baiviet');
var Tu=require('./../../models/tu');

var TinhTFIDF = async function () {
    var ArrVector_Baiviet = await vector_baiviet.find({});
    var ArrTu = await Tu.find({});
    for(var ItemVector_Baiviet of ArrVector_Baiviet)
    {
        for(var ItemTu of ArrTu)
        {
            if(ItemTu.tu === ItemVector_Baiviet.tu)
            {
                var t = ItemTu.idf * ItemVector_Baiviet.tf;
                vector_baiviet.update({ _id:ItemVector_Baiviet._id, tu:ItemVector_Baiviet.tu}, {$set: { tfidf:t}}, (err, tu) =>{
                    if(err)
                    {
                        console.log('loi'+err);
                    }
                    else{
                        console.log('cap nhat thanh cong!',{tu});
                    }
                });
            }
        }
    }
}

module.exports={
    TinhTFIDF
}