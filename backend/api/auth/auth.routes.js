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

    clothes: 'clothes',
    pants: 'clothes',
    shirt: 'clothes',
    shirts: 'clothes',
    socks: 'clothes',
    coat: 'clothes',
    coats: 'clothes',
    shoes: 'clothes',
    belt: 'clothes',
    belts: 'clothes',
    hat: 'clothes',
    hats: 'clothes',
    scarf: 'clothes',
    jacket: 'clothes',
    jackets: 'clothes',
    glasses: 'clothes',
    gloves: 'clothes',

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
        'https://mail.google.com',
        'https://www.googleapis.com/auth/contacts'
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
        let friends_emails = []
        let updated_friends_emails = []
        let friends_viewed_listings = {}

        // get user id
        User.findById(req.user.id)
            .then((result) => {
                // save tokens for Google API access
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

                const people = google.people({version: 'v1', auth: oAuth2Client});
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
                            people.people.connections.list({
                                resourceName: 'people/me',
                                // pageSize: 2,
                                personFields: 'names,emailAddresses',
                            }, (err, res) => {
                                if (res.data.connections){
                                    const connections = res.data.connections;
                                    // console.log('connections');
                                    // console.log(connections);
                                    // console.log('contacts emails: ' + connections[0]);
                                    for (let i = 0; i < connections.length; i++) {
                                        // console.log('person number ' + i + ' emails');
                                        for (let j = 0; j < connections[i].emailAddresses.length; j++) {
                                            // console.log('email number ' + j + ' on person');
                                            // console.log(connections[i].emailAddresses[j].value);
                                            friends_emails.push(connections[i].emailAddresses[j].value);
                                        }
                                    }
                                }
                                resolve('ok');
                            });
                        })
                    )
                })()
                    .then(() => {
                        // update friends_emails to keep only emails of registered users
                        for (let i of friends_emails) {
                            User.findOne({email: i}).then((result) => {
                                if (result) {
                                    updated_friends_emails.push(i);
                                    console.log('friends: ' + updated_friends_emails)
                                    // add the viewed listings to the view_listings
                                    if (result.viewed_listings) {
                                        for (let k in result.viewed_listings) {
                                            // if the listing is in the viewed_listings
                                            if (friends_viewed_listings[k]) {
                                                friends_viewed_listings[k] += result.viewed_listings[k];
                                            } else {
                                                friends_viewed_listings[k] = result.viewed_listings[k];
                                            }
                                        }
                                    }
                                }
                            })
                        }
                        // deletes listings that do not exist anymore
                        for(let k in friends_viewed_listings) {
                            User.findById(k).then((result) => {
                                if (!result) {
                                    delete friends_viewed_listings[k];
                                }
                            })
                        }
                    })
                    .then(() => {
                        // finds the 3 most wanted categories for the user and update his profile in the database
                        let categories_items = Object.keys(categoryCounter).map((key) => {
                            return [key, categoryCounter[key]];
                        });
                        categories_items.sort((first, second) => {
                            return second[1] - first[1];
                        });
                        let topCategories = [];
                        for (let k = 0; k < 3; k++) {
                            topCategories.push(categories_items[k][0]);
                        }

                        // finds the 5 (if possible) most viewed listings for updating user recommendation in database
                        let listings_items = Object.keys(friends_viewed_listings).map((key) => {
                            return [key, friends_viewed_listings[key]];
                        });
                        listings_items.sort((first, second) => {
                            return second[1] - first[1];
                        });
                        let top_listings = [];
                        let size = listings_items.length;
                        if(size > 5) {
                            size = 5
                        }
                        for (let k = 0; k < size; k++) {
                            top_listings.push(listings_items[k][0]);
                        }
                        console.log('update')
                        User.findByIdAndUpdate(
                            {_id: req.user.id},
                            {
                                recommended_from_friends: top_listings,
                                recommended_from_email: topCategories,
                                friends_emails: updated_friends_emails
                            })
                            .then((result, err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('friends and recommendations updated');
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

// endpoint to update the viewed_listings for the user in the database
router.put('/viewed_update', (req, res) => {
    User.findById(req.body.userId).then((result) => {
        if(result) {
            let viewed_listings = {}
            if (result.viewed_listings) {
                viewed_listings = result.viewed_listings;
            }
            if (viewed_listings[req.body.listingId]) {
                viewed_listings[req.body.listingId] += 1;
            }
            else {
                viewed_listings[req.body.listingId] = 1;
            }
            User.findByIdAndUpdate(req.body.userId, {viewed_listings: viewed_listings})
                .then((result) => {
                    console.log('viewed_listings updated');
                    res.status(200).send(result);
                })
        }
    })
})

// returns the requested user by id from the database
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then((result) => {
        res.send(result);
    })
})

module.exports = router;
