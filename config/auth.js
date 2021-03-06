// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'clientID', 
		'clientSecret' 	: 'clientSecret', 
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'clientID',
		'clientSecret' 	: 'clientSecret',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};