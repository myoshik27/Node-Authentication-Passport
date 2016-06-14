// app/routes.js

module.exports = function(app, passport){

	// ===================================
	// HOME PAGE (with login links) ======
	// ===================================
	app.get('/', function(req, res){
		res.render('index.ejs'); // load the index.ejs file
	});

	// ===================================
	// LOGIN =============================
	// ===================================
	// Show the login form

	app.get('/login', function(req, res){
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	// ===================================
	// SIGN UP ======================
	// ===================================

	// show the sign up form

	app.get('/signup', function(req, res){

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// prcoess the sign up form
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /*
	
	There is also much more you can do with this. Instead of specifying a successRedirect, you could use a callback and take more control over 
	how your application works. Here is a great stackoverflow answer on error handling. It explains how to use done() and how to be more specific 
	with your handling of a route.

	http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling

    */

	// ===================================
	// PROFILE SECCTION ==================
	// ===================================

	// we will want this protected so you ahve to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    	successRedirect : '/profile',
    	failureRedirect : '/'
    }));


	// ===================================
	// LOGOUT ============================
	// ===================================

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){

	// if user is authenticated in the session, carry on
	if(req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	res.redirect('/');

}


























