

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
       app.get('/auth/facebook', passport.authenticate('facebook', {
        // scope: [
        //     'https://www.facebookapis.com/auth/userinfo.profile',
        //     'https://www.facebookapis.com/auth/userinfo.email',
        //     // 'https://www.googleapis.com/auth/contacts.readonly'
        // ]
    }));
        app.get('/auth/facebook/callback',
    
            passport.authenticate('facebook', 
            // {
    
                
            //     failureRedirect: 'https://localhost:4200/authentication/register',
            //     session: false
               
            // }
            { successRedirect: '/profile',
            failureRedirect: '/login' }
            
            ),
        function (req, res) {
            console.log("login with oAuth hitted!!!!")
            // console.log("###########################          ", req);
            var token = res.req.user.token;
            var emailId = res.req.user.user.email;

            var username = res.req.user.user.username;
            var flagForOAuth = res.req.user.user.flagForOAuth;
            var accessToken = res.req.user.accessToken;
            console.log("thats the only thing i want          ", res.req.user.accessToken);

            // console.log()
            if (flagForOAuth == 1) {
                console.log("***********NEW USER*********************")
                res.redirect("https://localhost:4200/authentication/details-page/contactDetails1/" + token + "/" + emailId + "/" + username + "/" + accessToken);

            }
            else if (flagForOAuth == 0) {
                var mobileNo = res.req.user.user.mobileNo;
                console.log("***********REGISTERED USER*********************")
                res.redirect("https://localhost:4200/authentication/details-page/contactDetails1/" + token + "/" + emailId + "/" + username + "/" + accessToken);
            }
            else {
                console.log("***********SOME ISSUE OCCURED*********************")

            }

        })


}
