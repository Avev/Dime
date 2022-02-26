const router = require('express').Router();

// middleware that checks if the user is logged in
// const authCheck = (req, res, next) => {
//     // if user is not logged in
//     if(!req.user) {
//         res.redirect('/auth/google')
//     }
//     // if logged in
//     else {
//         next();
//     }
// }

router.get('/', (req, res) => {
    // returns the user if logged in, else returns null
    res.send(req.user);
});

module.exports = router;
