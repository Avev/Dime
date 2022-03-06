const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./auth.service');
const keys = require('../../keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
})


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
        clientID: keys.google.GOOGLE_CLIENT_ID,
        clientSecret: keys.google.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    function(accessToken, refreshToken, otherTokenDetails, profile, done) {
    let tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
        scope: otherTokenDetails,
        token_type: otherTokenDetails.token_type,
        expiry_date: otherTokenDetails.expires_in
    }
        // checks if the account logged in before and in the database
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){

                User.findOneAndUpdate({googleId: profile.id}, {tokens: tokens})
                    .then((user) => {
                        done(null, user)
                    });
            } else{
                // if it's the accounts first login in adds it to the database
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    tokens: tokens
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    }
));
