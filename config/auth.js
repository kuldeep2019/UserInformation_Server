// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	
    'facebookAuth' : {
<<<<<<< HEAD
        'clientID' 		: '163580304822250', // App ID
        'clientSecret' 	: 'a3cfef322c0f112f041a8caafc15a9aa', // App Secret,
=======
        'clientID' 		: '149703079756185', // App ID
        'clientSecret' 	: '923ee32ea26fd46c249d8e300eb7121b', // App Secret,
>>>>>>> 6080600943be0d8fd42b9e1e83d5de6e2d9129f7
        'callbackURL'   : "https://localhost:3000/auth/facebook/callback"

    },
    'googleAuth' : {
        'clientID' 		: '558266834723-ku2ag4dmt032k2av402sg9hc3kau9frp.apps.googleusercontent.com',
        'clientSecret' 	: 'PLsM0tp4frTyQ6DLlmdWv_-a',
        'callbackURL'   : 'https://localhost:3000/auth/google/callback' 
    }


};