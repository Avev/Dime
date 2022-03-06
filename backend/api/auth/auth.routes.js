const router = require('express').Router();
const passport = require('passport');
const keys = require('../../keys');
const {google} = require("googleapis");
const User = require('./auth.service');


const redirectURL = 'http://localhost:3000'

const categoryDict = {
    furniture: 'furniture',
    table: 'furniture',
    desk: 'furniture',
    chair: 'furniture',
    bed: 'furniture',
    sofa: 'furniture',
    closet: 'furniture',
    shelf: 'furniture',
    mattress: 'furniture',

    electronics: 'electronics',
    computer: 'electronics',
    pc: 'electronics',
    lamp: 'electronics',
    ssd: 'electronics',
    hdd: 'electronics',
    gpu: 'electronics',
    cpu: 'electronics',
    case: 'electronics',
    phone: 'electronics',
    telephone: 'electronics',
    screen: 'electronics',
    monitor: 'electronics',
    keyboard: 'electronics',
    mouse: 'electronics',
    toaster: 'electronics',
    machine: 'electronics',
    printer: 'electronics',
    fax: 'electronics',
    console: 'electronics',
    calculator: 'electronics',
    clock: 'electronics',
    radiator: 'electronics',
    oven: 'electronics',

    cloths: 'cloths',
    pants: 'cloths',
    shirt: 'cloths',
    shirts: 'cloths',
    socks: 'cloths',
    coat: 'cloths',
    coats: 'cloths',
    shoes: 'cloths',
    belt: 'cloths',
    belts: 'cloths',
    hat: 'cloths',
    hats: 'cloths',
    scarf: 'cloths',
    jacket: 'cloths',
    jackets: 'cloths',
    glasses: 'cloths',
    gloves: 'cloths',

    book: 'books/media',
    books: 'books/media',
    media: 'books/media',
    music: 'books/media',
    novel: 'books/media',

    sport: 'sports',
    sports: 'sports',
    weight: 'sports',
    weights: 'sports',
    dumbbell: 'sports',
    dumbbells: 'sports',
    ball: 'sports',
    balls: 'sports',
    training: 'sports',
    bottle: 'lifestyle',
    bottles: 'lifestyle',

    game: 'games',
    games: 'games',
    tabletop: 'games',

    lifestyle: 'lifestyle',
    lifestyles: 'lifestyle',
    cream: 'lifestyle',
    spray: 'lifestyle',
    makeup: 'lifestyle',
    mascara: 'lifestyle',
    eyeliner: 'lifestyle',
}

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
        'https://www.googleapis.com/auth/gmail.addons.current.message.action',
        'email',
        'https://mail.google.com'
    ],
    accessType: 'offline'
}));

// redirect after authentication
router.get('/google/redirect', passport.authenticate('google'
    // successRedirect: redirectURL,
    // failureRedirect: redirectURL,
), (req, res) => {
    try {
        let categoryCounter = {
            furniture: 0,
            electronics: 0,
            cloths: 0,
            'books/media': 0,
            sports: 0,
            games: 0,
            lifestyle: 0
        };
        // get user id
        User.findById(req.user.id)
            .then((result) => {
                // save tokens for google API access
                const tokens = result.tokens;
                const client_secret = keys.google.GOOGLE_CLIENT_SECRET;
                const client_id = keys.google.GOOGLE_CLIENT_ID;
                // const redirect_uris = redirectURL;
                const oAuth2Client = new google.auth.OAuth2(
                    client_id,
                    client_secret,
                    redirectURL
                )
                oAuth2Client.setCredentials(tokens)
                const gmail = google.gmail({version: "v1", auth: oAuth2Client});
                // gets the list of mails from the user's Gmail
                (() => {
                    return new Promise((resolve, reject) =>
                        gmail.users.messages.list({userId: req.user.googleId}, (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            // iterates on the last 30 messages or fewer if there are fewer messages
                            let messages_length = result.data.messages.length;
                            let mail_iterations = 30
                            if (messages_length < mail_iterations) {
                                mail_iterations = messages_length;
                            }
                            for (let i = 0; i < mail_iterations; i++) {
                                // get a specific mail by its id
                                gmail.users.messages.get({
                                    userId: req.user.googleId,
                                    id: result.data.messages[i].id
                                }, (err, request) => {
                                    let title = request.data.payload.headers.find(x => x.name === 'Subject').value;
                                    let lowerCaseTitle = title.toLowerCase();
                                    for (let k in categoryDict) {
                                        if (lowerCaseTitle.includes(k)) {
                                            categoryCounter[categoryDict[k]] += 1;
                                        }
                                    }
                                })
                            }
                            resolve('ok');
                        })
                    )
                })().then(() => {
                    // finds the 3 most wanted categories for the user and update his profile in the database
                    let items = Object.keys(categoryCounter).map((key) => {
                        return [key, categoryCounter[key]];
                    });
                    items.sort((first, second) => {
                        return second[1] - first[1];
                    });
                    let topCategories = [];
                    for (let k = 0; k < 3; k++) {
                        topCategories.push(items[k][0]);
                    }
                    User.findByIdAndUpdate(
                        {_id: req.user.id},
                        {recommended: topCategories})
                        .then((result, err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('recommendations updated');
                            }
                        })
                }).then(() => {
                    res.redirect(redirectURL);
                })
                // res.redirect(redirectURL);
            })
            .catch((err) => {
                console.log(err);
            });
        // res.redirect(redirectURL);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
