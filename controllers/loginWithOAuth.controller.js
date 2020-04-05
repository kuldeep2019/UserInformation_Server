

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        console.log("hurray");
    });
    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            // 'https://www.googleapis.com/auth/contacts.readonly'
        ]
    }));

    app.get('/auth/google/callback',

        passport.authenticate('google', {

            failureRedirect: 'https://localhost:4200/authentication/register',
            session: false
           
        }),
       );
       app.get('/auth/facebook',
  passport.authenticate('facebook',
  {
  failureRedirect: "/fail"
  }
  ));
    //    app.get('/auth/facebook', passport.authenticate('facebook', {
    //     scope: [
    //         'https://www.facebookapis.com/auth/userinfo.profile',
    //         'https://www.facebookapis.com/auth/userinfo.email',
    //         // 'https://www.googleapis.com/auth/contacts.readonly'
    //     ]
    // }));
        app.get('/auth/facebook/callback',
    
            passport.authenticate('facebook', 
            {
     
                failureRedirect: 'https://localhost:4200/authentication/register',
                session: false
               
            }
            // { successRedirect: '/profile',
            // failureRedirect: '/login' }
            
            ),
        function (req, res) {
            console.log("login with oAuth hitted!!!!")
        })


}
