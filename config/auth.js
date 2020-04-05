// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	
    'facebookAuth' : {
        'clientID' 		: '163580304822250', // App ID
        'clientSecret' 	: 'a3cfef322c0f112f041a8caafc15a9aa', // App Secret,
        'callbackURL'   : "https://localhost:3000/auth/facebook/callback"

    },
    'googleAuth' : {
        'clientID' 		: '558266834723-ku2ag4dmt032k2av402sg9hc3kau9frp.apps.googleusercontent.com',
        'clientSecret' 	: 'PLsM0tp4frTyQ6DLlmdWv_-a',
        'callbackURL'   : 'https://localhost:3000/auth/google/callback' 
    }


};