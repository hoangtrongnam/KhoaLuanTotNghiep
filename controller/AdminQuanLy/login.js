const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs');
var TinhTF = require('./../Admin/tinh_tf');
var TinhKhoangCachHaiBaiViet = require('./../Admin/tinh_cosine');

router.use(bodyParser.urlencoded({ extended: true }));

var BaiBao = require('./../../models/bai_bao');
var User = require('./../../models/user');
require('x-date');
module.exports = (app, passport) => {

    app.get('/login', function (req, res) {
        res.render('admin/login.ejs', { message: req.flash('loginMessage') });
    });
    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('login');
    });
    app.post('/admin', passport.authenticate('local-login', {
        successRedirect: '/indexAdmin', // chuyển hướng đế trang index
        failureRedirect: '/login', // chuyển hướng trở lại trang đăng nhập nếu có lỗi
        failureFlash: true // cho phép thông báo
    }));
    // router for indexadmin user page
    app.get('/indexAdmin', isLoggedInAdmin, async (req, res) => {
        var user = await User.find({});
        for (var item of user) {
            console.log(item.local.TenKH)
        }
        return await res.render('admin/index.ejs', { user });
    })

    //create user
    app.get('/CreateAccount', function(req, res) {
        console.log('===========================================================================',{message: req.flash('signupMessage')});
        res.render('admin/createuser.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/CreateAccount', passport.authenticate('local-signup', {
        successRedirect : '/indexAdmin', // redirect to the secure profile section
        failureRedirect : '/CreateAccount', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    //edit user
    app.get('/edituser/:id', isLoggedInAdmin, async (req, res) => {
        var user = await User.find({});
        BaiBao.findById(req.params.id).then(async (data) => {
            return await res.render('admin/edituser.ejs', { user });
        })
    })

    //delete user
    app.get('/deleteuser/:id', isLoggedInAdmin, async (req, res) => {

        var id = req.params.id;
        console.log(id);
        User.findByIdAndRemove(req.params.id, (err, vector_user) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            res.redirect('/chontu');
        });

        var user = await User.find({});
        return await res.render('admin/edituser.ejs', { user });
    })

    // router for indexadmin bao
    app.get('/indexbao', isLoggedInAdmin, async (req, res) => {
        var baiBao = await BaiBao.find({}).sort({ThoiGian:-1});
        res.render('admin/indexBao.ejs', { baiBao });
    })

    // router for indexadmin user page
    app.get('/indexeditbao/:id', isLoggedInAdmin, async (req, res) => {
        // var id = req.params.id;
        // var data = await BaiBao.findById(id);
        BaiBao.findById(req.params.id).then(async (data) => {
            res.render('admin/indexEditBao.ejs', { data });
        });
    })

    // router for indexadmin user page
    app.post('/updatebaibao/:id', isLoggedInAdmin, async (req, res) => {
        var id = req.params.id;
        var TieuDe = req.body.TieuDe;
        var ThoiGian = req.body.ThoiGian;
        console.log(req.body)
        // BaiBao.findByIdAndUpdate({_id: id}, { TieuDe : req.body.TieuDe ,ThoiGian:req.body.ThoiGian }, { multi: true }, function (err, raw) {
        //     if (err) {
        //         return handleError(err);
        //     }
        //     else{
        //         console.log('phan hoi kq ', raw);
        //     }
        // });
    })

    //delete bai viet
    app.get('/deletebaibao/:id', isLoggedInAdmin, async (req, res) => {
        var id = req.params.id;
        console.log(id);
        User.findByIdAndRemove(req.params.id, (err, vector_user) => {
            if (err) return res.status(500).send(err);
            res.redirect('/indexbao');
        });
    })


    // router for indexadmin user page
    app.get('/vietbai', isLoggedInAdmin, async (req, res) => {
        res.render('admin/vietbai.ejs')
    })

    app.post('/createbaiviet', isLoggedInAdmin, (req, res) => {
        ;
        console.log(req.body)
        
        var NoiDung = req.body.descr;
        var hamtrim=NoiDung.trim();
        var toLowerCase_text=hamtrim.toLowerCase();
        var pattern = /!|@|{|}|"|'|%|;|:|$|#|@|&|^|_|~|`|=|-|,|<|>| a lô | a ha | ai ai| ai nấy | ai đó | anh ấy | ba ba | ba bản | ba cùng | ba họ | ba ngày | ba ngôi | ba tăng | bao giờ | bao lâu | bao nhiêu | bao nả | bay biến | biết |biết bao | biết bao nhiêu | biết chắc | biết chừng nào | biết mình | biết mấy | biết thế | biết trước | biết việc | biết đâu | biết đâu chừng | biết đâu đấy | biết được | buổi | buổi làm | buổi mới| buổi ngày | buổi sớm | bà | bà ấy |bài | bài bác | bài bỏ | bài cái | bác | bán | bán cấp | bán dạ |bán thế | bây bẩy | bây chừ | bây giờ | bây nhiêu | bèn | béng | bên | bên bị | bên có | bên cạnh | bông | bước | bước khỏi | bước tới | bước đi | bạn | bản | bản bộ | bản riêng | bản thân | bản ý |bất chợt | bất cứ | bất giác | bất kì | bất kể | bất kỳ | bất luận | bất ngờ | bất nhược | bất quá | bất quá chỉ | bất thình lình | bất tử | bất đồ | bấy | bấy chầy | bấy chừ | bấy gi | bấy lâu | bấy lâu nay | bấy nay | bấy nhiêu | bập bà bập bõm | bập bõm | bắt đầu | bắt đầu từ | bằng | bằng cứ | bằng không | bằng người | bằng nhau | bằng như | bằng nào | bằng nấy | bằng vào | bằng được | bằng ấy | bển | bệt | bị | bị chú | bị vì | bỏ | bỏ bà | bỏ cha | bỏ cuộc | bỏ không | bỏ lại | bỏ mình | bỏ mất | bỏ mẹ |bỏ nhỏ | bỏ quá | bỏ ra | bỏ riêng | bỏ việc | bỏ xa | bỗng | bỗng chốc | bỗng dưng | bỗng không | bỗng nhiên | bỗng nhưng  | bỗng thấy  | bỗng đâu | bộ | bộ thuộc | bộ điều | bội phần | bớ | bởi | bởi ai | bởi chưng | bởi nhưng | bởi sao | bởi thế | bởi thế cho nên  | bởi tại  | bởi vì | bởi vậy | bởi đâu | cao lâu | cao ráo |cao răng | cao sang | cao số | cao thấp | cao thế | cao xa | cha chả | chao ôi |chia sẻ | chiếc | cho | cho biết | cho chắc | cho hay | cho nhau | cho nên | cho rằng | cho rồi | cho thấy | cho tin | cho tới | cho tới khi | cho về | cho ăn | cho đang | cho được | cho đến | cho đến khi | cho đến nỗi |choa | chu cha  |chui cha | chung |chung cho | chung chung |chung cuộc | chung cục | chung nhau | chung qui | chung quy |chung quy lại | chung ái | chuyển | chuyển tự | chuyển đạt | chuyện | chuẩn bị | chành chạnh |chí chết | chính giữa | chính thị | chính điểm | chùn chùn | chùn chũn | chú dẫn |chú khách | chú mày | chú mình | chúng mình | chúng ta | chúng tôi | chúng ông | chăn chắn | chăng chắc | chăng nữa | chưa bao giờ| chưa | chắc | chưa có | chưa cần| chưa dùng | chưa dễ | chưa kể |chưa tính |chưa từng | chầm chập | chậc | chắc chắn | chắc dạ | chắc hẳn | chắc lòng  | chắc người | chắc vào | chắc ăn | chẳng lẽ | chẳng những | chẳng nữa | chẳng phải | chết nỗi | chết thật | chết tiệt | chỉ có | chỉ là | chỉ tên| chị |  chị bộ |chị ấy | chịu chưa | chịu lời | chịu tốt | chịu ăn | chọn | chọn bên | chọn ra | chốc chốc | chớ | chớ chi | chớ gì | chớ không | chớ kể | chớ như | chợt |chợt | chợt nhìn | chứ | chứ ai | chứ còn | chứ gì  | chứ không | chứ không phải | chứ lại | chứ lị | chứ như | chứ sao | coi bộ | coi mòi | con | con con | con dạ | con nhà | con tính | cu cậu |cuối cùng | cuối điểm|cuốn | cuộc | càng | càng càng | càng hay | cá nhân | các | các cậu | cách bức | cách không | cách nhau | cách đều | cái | cái gì | cái đã | cái đó |  cái ấy | câu hỏi |cây | cây nước | còn | còn như | còn nữa | còn thời gian  | còn về | có | có ai | có chuyện | có chăng | có chăng là | có chứ|có cơ | có dễ | có họ | có khi | có ngày | có người | có nhiều | có nhà| có phải | có số | có tháng | có thế | có thể | có vẻ | có ý | có ăn | có điều | có điều kiện | có đáng | có đâu |có được | cóc khô | cô | cô mình | | cô ấy | công nhiên | cùng | cùng chung | cùng cực | cùng nhau  | cùng tuổi | cùng tột | cùng với | cùng ăn | căn cắt| cũng | cũng như | cũng nên | cũng thế | cũng vậy | cũng vậy thôi | cũng được | cơ | cơ chỉ |cơ chừng | cơ cùng | cơ dẫn | cơ hồ | cơ hội | cơ mà | cả nghe | cả nghĩ | cả ngày |c ả người | cả nhà | cả năm | cả thảy | cả thể | cả tin | cả ăn | cả đến | cảm thấy | cảm ơn | cần | cần cấp | cần gì | cần số | cật lực | cật sức | cậu | cổ lai | cụ thể | cụ thể là | cụ thể như | của  |của ngọt | của tin | cứ | cứ như | cứ việc | cứ điểm | cực lực | do | do vì | do vậy | do đó | duy | duy chỉ | duy có | dài  |dài lời | dài ra | dành | dành dành | dào | dì | dù | dù cho | dù dì | dù gì | dù rằng | dù sao | dùng | dùng cho | dùng hết | dùng làm | dùng đến | dưới | dưới nước |dạ | dạ bán | dạ con | dạ dài | dạ dạ | dạ khách |dần dà | dần dần | dầu sao | dẫn |dẫu | dẫu mà | dẫu rằng | dẫu sao | dễ | dễ dùng | dễ gì  | dễ khiến | dễ nghe | dễ ngươi  | dễ như chơi  | dễ sợ  |dễ sử dụng  | dễ thường | dễ thấy | dễ ăn | dễ đâu | dở chừng | dữ | dữ cách |giá trị |giá trị thực tế |giảm | giảm chính | giảm thấp | giảm thế | giống | giống người | giống nhau | giống như | giờ | giờ lâu | giờ này | giờ đi | giờ đây | giờ đến | giữ | giữ lấy | giữ ý | giữa  | giữa lúc| gây| gây cho | gây giống | gây ra| gây thêm| gì | gì đó | gần | gần bên | gần hết | gần ngày | gần như | gần xa | gần đây |gần đến | gặp | gặp khó khăn | gặp phải | gồm | hay | hay biết | hay hay | hay không | hay là | hay làm | hay nhỉ | hay nói |hay sao | hay tin | hay đâu | hiểu | hiện nay | hiện tại | hoàn toàn | hoặc | hoặc là | hãy | hãy còn | hơn | hơn cả  | hơn hết | hơn là | hơn nữa |hơn trước | hầu hết | hết | hết chuyện  | hết cả | hết của | hết nói | hết ráo | hết rồi |hết ý | họ | họ gần | họ xa | hỏi | hỏi lại | hỏi xem | hỏi xin | hỗ trợ| khi | khi khác | khi không | khi nào | khi nên | khi trước | khiến | khoảng | khoảng cách | khoảng không | khá | khá tốt | khác | khác gì | khác khác | khác nhau | khác nào | khác thường| khác xa | khách | khó | khó biết | khó chơi | khó khăn | khó làm | khó mở | khó nghe | khó nghĩ | khó nói | khó thấy | khó tránh | không |không ai | không bao giờ |không bao lâu | không biết | không bán | k hông chỉ | không còn | không có | không có gì | không cùng | không cần | không cứ | không dùng | không gì | không hay | không khỏi | không kể | không ngoài | không nhận | không những | không phải | hông phải không | không thể | không tính  | không điều kiện | không được | không đầy | không để | khẳng định | khỏi | khỏi nói |kể |kể cả | kể như | kể tới | kể từ | liên quan | loại | loại từ | luôn| luôn cả | luôn luôn | luôn tay | là | là cùng | là là | là nhiều | là phải | là thế nào | là vì | là ít | làm | làm bằng | làm cho | làm dần dần | làm gì | làm lòng |l àm lại |làm lấy | làm mất | làm ngay | làm như | làm nên |làm ra | làm riêng |làm sao |làm theo | làm thế nào | làm tin |làm tôi |làm tăng |làm tại | làm tắp lự  | làm vì | làm đúng | làm được | lâu | lâu các | lâu lâu | lâu nay | lâu ngày | lên | lên cao | lên cơn | lên mạnh | lên ngôi | lên nước | lên số | lên xuống | lên đến | lòng | lòng không | lúc | lúc khác | lúc lâu | lúc nào | lúc này | lúc sáng | lúc trước | lúc đi | l úc đó |lúc đến | l úc ấy | lý do |lượng | lượng cả | lượng số | lượng từ | lại | lại bộ |  cái | lại còn | lại giống | lại làm | lại người  |lại nói | lại nữa | lại quả | lại thôi | lại ăn | lại đây | lấy | lấy có | l ấy cả | lấy giống | l ấy làm  | lấy lý do| lấy lại | lấy ra | lấy ráo | lấy sau | lấy số | lấy thêm | lấy thế | lấy vào | lấy xuống |lấy được | lấy để | lần | lần khác | lần lần |lần nào |lần này | lần sang | lần sau | lần theo | lần trước | lần tìm | lớn| lớn lên | lớn nhỏ| lời | lời chú | lời nói | mang | mang lại | mang mang | mang nặng | mang về |\n|\t/ig;
        var replace_text = toLowerCase_text.replace( pattern, " " );

        var _BaiBao = new BaiBao();
        _BaiBao.TieuDe = req.body.TieuDe;
        _BaiBao.NoiDung_text = replace_text;
        _BaiBao.NoiDung_html = req.body.descr;
        _BaiBao.Hinh = req.body.Hinh;
        _BaiBao.Link = new Date();;
        _BaiBao.TheLoai = req.body.TheLoai;
        _BaiBao.ThoiGian = new Date();
        _BaiBao.save(async(err, data) => {
            if (err) {
                console.log('loi crawl khi luu gia tri!');
            }
            else {
                console.log('crawl thành công!', data);
                await TinhTF.TF(data.NoiDung_text,data._id);
                await TinhKhoangCachHaiBaiViet.KhoangCachHaiBaiViet(data._id);
                await res.redirect('/indexbao')
            }
        })
    })
}

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedInAdmin(req, res, next) {
    if (req.isAuthenticated())// hàm kiểm tra xem người dùng có đang đăng nhập hay không khi lướt qua các trang khác
    {
        return next();
    }
    res.redirect('/login');
}