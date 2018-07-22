module.exports = function(app, passport) {
    // SIGNUP =================================
    // show the signup form
    app.get('/dangky', function(req, res) {
        console.log('===========================================================================');
        res.render('nguoidoc/dangky.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/dangky', passport.authenticate('local-signup', {
        successRedirect : '/nguoimoi', // redirect to the secure profile section
        failureRedirect : '/dangky', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};