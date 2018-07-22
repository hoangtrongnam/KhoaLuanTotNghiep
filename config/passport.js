
// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;


// load the auth variables
var configAuth = require('./auth'); // use this one for testing

var User = require('../models/user');


module.exports = function(passport) {
    // passport.serializeUser: hàm được gọi khi xác thực thành công để lưu thông tin user vào session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // passport.deserializeUser : hàm được gọi bởi passport.session .
    ///Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField : 'Email',
        passwordField : 'PassWord',
        passReqToCallback : true 
    },
    function(req, Email, PassWord, done) {
        if (Email)
            Email = Email.toLowerCase(); //chuyển thành chuổi thường
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.Email' :  Email }, function(err, user) {        
                if (err){
                    return done(err);
                }
                // nếu không tìm thấy user trả về thông báo lỗi
                if (!user){
                    return done(null, false, req.flash('loginMessage', 'Không tìm thấy Email.'));
                }
                //qua models kiểm tra hợp lệ
                if (!user.validPassword(PassWord))
                {
                    return done(null, false, req.flash('loginMessage', 'Sai password.'));
                }
                // all is well, return user
                else{
                    console.log(user.local.TenKH);
                    return done(null, user);
                }
            });
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'Email',
        passwordField : 'PassWord',
        passReqToCallback : true
    },
    function(req, Email, PassWord, done) {
        var TenKH = req.body.TenKH;
        var SDT = req.body.SDT;
        if (Email)
            Email = Email.toLowerCase(); // chuyển email về ký tự thường hết
        // asynchronous
        process.nextTick(function() {
            // nếu người dùng chưa đăng nhập
            if (!req.user) {
                User.findOne({ 'local.Email' :  Email }, function(err, user) {
                    // nếu gặp lỗi thì trả lỗi về
                    if (err)
                        return done(err);

                    //Kiểm tra xem đã có tài khoản Email đó hay chưa
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Email đã tồn tại.'));
                    } else {
                        var newUser = new User();
                        newUser.local.TenKH = TenKH;
                        newUser.local.Email = Email;
                        newUser.local.PassWord = newUser.generateHash(PassWord);
                        newUser.local.SDT = SDT;
                        console.log(newUser);
                        console.log('//////////////////////////////////////////////////////////////////////////////////////////////////',PassWord,Email)
                        //console.log(usename+'================');
                        newUser.save(function(err) {
                            if (err){
                                console.log('============================',err)
                                return done(err);
                            }
                            else{
                                console.log(newUser);
                            return done(null, newUser);
                            }
                        });
                    }
                });
            }
            //nếu người dùng đăng nhập nhưng không phải tài khoản của hệ thống
             else if ( !req.user.local.Email ) {
                User.findOne({ 'local.Email' :  Email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'Email đã tồn tại!'));
                    } else {
                        var user = req.user;
                        user.local.Email = Email;
                        user.local.TenKH=TenKH;
                        user.local.PassWord = user.generateHash(PassWord);
                        user.local.SDT = SDT;
                        user.local.DiaChi = DiaChi;
                        console.log(user);
                        user.save(function (err) {
                            if (err)
                            {
                                console.log(err)
                                return done(err);
                            }
                            
                            return done(null,user);
                        });

                    }
                });
            } else {
                //người dùng đã có tài khoản cục bộ bỏ qua đăng ký
                return done(null, req.user);
            }
        });
    })
    );
        // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            console.log(user,'======================================================================================');
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
               
                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
};

