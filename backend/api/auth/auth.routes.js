const router = require('express').Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//     res.send('logging in')
// })

router.get('/logout', (req, res) => {
    req.logout();
    res.send('logging out')
})

router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        // request to have access to view the user's emails
        'https://www.googleapis.com/auth/gmail.addons.current.message.action'
    ]
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
   res.send('you reached the callback URI')
});

module.exports = router;
