
/**
 * Created By :- Madhu Jha
 * Created Date :- 05--2020 5:30 pm
 * Version :- 1.0
 */
module.exports = function (app, passport) {

    app.get('/', function (req, res) {
    });

    // google auth
    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            
        ]
    }));
    // google callback
    app.get('/auth/google/callback',

        passport.authenticate('google', {

            failureRedirect: 'http://localhost:4200',
            session: false

        }),
        function (req, res) {
            res.redirect("http://localhost:4200/pages/pages/google-UserInfo-Form?fullName=" + res.req.user.displayName + "&email=" + res.req.user.emails[0].value + "&photo=" + res.req.user.photos[0].value);
        })

    // facebook auth    
    app.get('/auth/facebook',
        passport.authenticate('facebook',
            {
                failureRedirect: "http://localhost:4200"
            }
        ));
    // facebook callback    
    app.get('/auth/facebook/callback',

        passport.authenticate('facebook',
            {

                failureRedirect: 'http://localhost:4200',
                session: false

            }

        ),
        function (req, res) {
            res.redirect("http://localhost:4200/pages/pages/facebook-UserInfo-Form?surName=" + res.req.user.name.familyName + "&firstName=" + res.req.user.name.givenName);
        })


}
