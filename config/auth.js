// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'clientID', 
		'clientSecret' 	: 'clientSecret', 
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID' 		: '1047875748366-an49ljqpgm0rd7rbd703thlfqdnj3frn.apps.googleusercontent.com',
		'clientSecret' 	: '3oHTeiDLCZyeaGZMsbVzuvH9',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};