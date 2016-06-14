// config/auth.js

// expose our config directly to our application using module.exports
var secret = require('./secret.js');
module.exports = {

    'facebookAuth' : {
        'clientID'      : secret.facebookAuth.clientID, // your App ID
        'clientSecret'  : secret.facebookAuth.clientSecret, // your App Secret
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : secret.twitterAuth.consumerKey,
        'consumerSecret'    : secret.twitterAuth.consumerSecret,
        'callbackURL'       : 'http://localhost:8000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : secret.googleAuth.clientID,
        'clientSecret'  : secret.googleAuth.clientSecret,
        'callbackURL'   : 'http://127.0.0.1:8000/auth/google/callback'
    }

};