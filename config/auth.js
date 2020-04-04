// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	
    'facebookAuth' : {
        'clientID' 		: '149703079756185', // App ID
        'clientSecret' 	: '923ee32ea26fd46c249d8e300eb7121b', // App Secret,
        'callbackURL'   : "http://localhost:3000/auth/facebook/callback"

    },
    'googleAuth' : {
        'clientID' 		: '558266834723-ku2ag4dmt032k2av402sg9hc3kau9frp.apps.googleusercontent.com',
        'clientSecret' 	: 'crS_zejVrMGCYCPO8uEY9QvP',
        'callbackURL'   : 'https://localhost:3000/auth/google/callback' 
    }


};