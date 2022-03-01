const router = require('express').Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//     res.send('logging in')
// })

const redirectURL = 'http://localhost:3000'

// endpoint for checking if the user is logged and if so to get it
router.get('/login/success', (req, res) => {
    // if user is logged in
    if (req.user) {
        res.status(200).send({user: req.user});
    }
})

// logout request
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(redirectURL)
    // res.send('logging out')
})

// authentication request
router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        // request to have access to view the user's emails
        'https://www.googleapis.com/auth/gmail.addons.current.message.action'
    ]
}));

// redirect after authentication
router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: redirectURL,
    failureRedirect: redirectURL,
}));

// redirect after authentication
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//    // res.send(req.user);
//     res.redirect(redirectURL)
// });

module.exports = router;
