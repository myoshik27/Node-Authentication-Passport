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
    	failureRedirect : '/',
    	failureFlash: true
    }));

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
    	passport.authenticate('twitter', {
    		successRedirect : '/profile',
    		failureRedirect : '/'
    	}));


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {
    	successRedirect : '/profile',
    	failureRedirect : '/'
    }));

    // =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
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


























