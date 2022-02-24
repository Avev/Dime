const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./auth.service');

//***********************************************************
GOOGLE_CLIENT_ID = '250343822418-kgkjs6g1au8lmli1f13gldng1v7i3unt.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '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'
//**********************************************************

passport.serializeUser((user, done) => {
    done(null, user.id);
})


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    function(accessToken, refreshToken, profile, done) {
        // checks if the account logged in before and in the database
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else{
                // if it's the accounts first login in adds it to the database
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    }
));
