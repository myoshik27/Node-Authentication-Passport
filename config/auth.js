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
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8000/auth/google/callback'
    }

};