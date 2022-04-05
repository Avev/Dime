const router = require('express').Router();
const passport = require('passport');
const keys = require('../../keys');
const {google} = require("googleapis");
const User = require('./auth.service');
const ItemServices = require('../items/item.service');
const {request} = require("express");


const redirectURL = 'http://localhost:3000'

// const categoryDict = {
//     furniture: 'furniture',
//     table: 'furniture',
//     desk: 'furniture',
//     chair: 'furniture',
//     bed: 'furniture',
//     sofa: 'furniture',
//     closet: 'furniture',
//     shelf: 'furniture',
//     mattress: 'furniture',
//
//     electronics: 'electronics',
//     speakers: 'electronics',
//     computer: 'electronics',
//     lamp: 'electronics',
//     ssd: 'electronics',
//     hdd: 'electronics',
//     gpu: 'electronics',
//     cpu: 'electronics',
//     case: 'electronics',
//     phone: 'electronics',
//     telephone: 'electronics',
//     screen: 'electronics',
//     monitor: 'electronics',
//     keyboard: 'electronics',
//     mouse: 'electronics',
//     toaster: 'electronics',
//     machine: 'electronics',
//     printer: 'electronics',
//     fax: 'electronics',
//     console: 'electronics',
//     calculator: 'electronics',
//     clock: 'electronics',
//     radiator: 'electronics',
//     oven: 'electronics',
//
//     clothes: 'clothes',
//     pants: 'clothes',
//     shirt: 'clothes',
//     shirts: 'clothes',
//     socks: 'clothes',
//     coat: 'clothes',
//     coats: 'clothes',
//     shoes: 'clothes',
//     belt: 'clothes',
//     belts: 'clothes',
//     hat: 'clothes',
//     hats: 'clothes',
//     scarf: 'clothes',
//     jacket: 'clothes',
//     jackets: 'clothes',
//     glasses: 'clothes',
//     gloves: 'clothes',
//
//     book: 'books/media',
//     books: 'books/media',
//     media: 'books/media',
//     music: 'books/media',
//     novel: 'books/media',
//
//     sport: 'sports',
//     sports: 'sports',
//     weight: 'sports',
//     weights: 'sports',
//     dumbbell: 'sports',
//     dumbbells: 'sports',
//     ball: 'sports',
//     balls: 'sports',
//     training: 'sports',
//     bottle: 'lifestyle',
//     bottles: 'lifestyle',
//
//     game: 'games',
//     games: 'games',
//     tabletop: 'games',
//
//     lifestyle: 'lifestyle',
//     lifestyles: 'lifestyle',
//     cream: 'lifestyle',
//     spray: 'lifestyle',
//     makeup: 'lifestyle',
//     mascara: 'lifestyle',
//     eyeliner: 'lifestyle',
// }

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
), async (req, res) => {
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

        let keywordCounter = {
            furniture: 0,
            table: 0,
            desk: 0,
            chair: 0,
            bed: 0,
            sofa: 0,
            closet: 0,
            shelf: 0,
            mattress: 0,

            electronics: 0,
            speakers: 0,
            headphones: 0,
            headset: 0,
            earphones: 0,
            computer: 0,
            lamp: 0,
            ssd: 0,
            hdd: 0,
            gpu: 0,
            cpu: 0,
            case: 0,
            phone: 0,
            telephone: 0,
            screen: 0,
            monitor: 0,
            keyboard: 0,
            mouse: 0,
            toaster: 0,
            machine: 0,
            printer: 0,
            fax: 0,
            console: 0,
            calculator: 0,
            clock: 0,
            radiator: 0,
            oven: 0,

            clothes: 0,
            pants: 0,
            shirt: 0,
            shirts: 0,
            socks: 0,
            coat: 0,
            coats: 0,
            shoes: 0,
            belt: 0,
            belts: 0,
            hat: 0,
            hats: 0,
            scarf: 0,
            jacket: 0,
            jackets: 0,
            glasses: 0,
            gloves: 0,

            book: 0,
            books: 0,
            media: 0,
            music: 0,
            novel: 0,

            sport: 0,
            sports: 0,
            weight: 0,
            weights: 0,
            dumbbell: 0,
            dumbbells: 0,
            ball: 0,
            balls: 0,
            training: 0,
            bottle: 0,
            bottles: 0,

            game: 0,
            games: 0,
            tabletop: 0,

            lifestyle: 0,
            lifestyles: 0,
            cream: 0,
            spray: 0,
            makeup: 0,
            mascara: 0,
            eyeliner: 0,
        }
        let friends_emails = [];
        let updated_friends_emails = [];
        let friends_viewed_listings = {};
        let friends_listings = [];

        // get user id
        let result = await User.findById(req.user.id);
        const tokens = result.tokens;
        const client_secret = keys.google.GOOGLE_CLIENT_SECRET;
        const client_id = keys.google.GOOGLE_CLIENT_ID;

        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirectURL
        )
        oAuth2Client.setCredentials(tokens);

        const people = google.people({version: 'v1', auth: oAuth2Client});
        const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
        // gets the list of mails from the user's Gmail
        let gmail_list_result = new Promise((resolve, reject) => {
            gmail.users.messages.list(
                {userId: req.user.googleId, q: 'category:promotions'},
                async (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result.data.resultSizeEstimate > 0) {
                    // iterates on the last 30 messages or fewer if there are fewer messages
                    let messages_length = result.data.messages.length;
                    let mail_iterations = 30;
                    if (messages_length < mail_iterations) {
                        mail_iterations = messages_length;
                    }
                    let promise_list = [];
                    for (let i = 0; i < mail_iterations; i++) {
                        // get a specific mail by its id
                        promise_list.push(new Promise((resolve, reject) => {
                            gmail.users.messages.get({
                                userId: req.user.googleId,
                                id: result.data.messages[i].id
                            }, (err, res) => {
                                if (err) {
                                    reject(err);
                                }
                                let title = res.data.payload.headers.find(x => x.name === 'Subject').value;
                                let lower_case_title = title.toLowerCase();
                                // for (let k in categoryDict) {
                                //     if (lower_case_title.includes(k)) {
                                //         categoryCounter[categoryDict[k]] += 1;
                                //     }
                                // }
                                for (let k in keywordCounter) {
                                    if (lower_case_title.includes(k)) {
                                        keywordCounter[k] += 1;
                                    }
                                }
                                resolve();
                            })
                        }))
                    }
                    await Promise.all(promise_list);
                }
                resolve();
            })
        })

        let people_list_result = new Promise((resolve, reject) => {
            people.people.connections.list({
                resourceName: 'people/me',
                personFields: 'names,emailAddresses',
            }, (err, res) => {
                if (res.data.connections) {
                    const connections = res.data.connections;
                    for (let i = 0; i < connections.length; i++) {
                        for (let j = 0; j < connections[i].emailAddresses.length; j++) {
                            friends_emails.push(connections[i].emailAddresses[j].value);
                        }
                    }
                }
                resolve();
            })
        })
        await gmail_list_result;
        await people_list_result;
        // update friends_emails to keep only emails of registered users
        for (let i of friends_emails) {
            result = await User.findOne({email: i})
            if (result) {
                let user_listings = await ItemServices.find({userId: result.id});
                for (let j of user_listings) {
                    friends_listings.push(j.id);
                }

                updated_friends_emails.push(i);
                console.log('friends: ' + updated_friends_emails);
                // add the viewed listings to the friends_viewed_listings
                if (result.viewed_listings) {
                    for (let k in result.viewed_listings) {
                        // if the listing is in the friends_viewed_listings
                        if (friends_viewed_listings[k]) {
                            friends_viewed_listings[k] += result.viewed_listings[k];
                        }
                        else {
                            friends_viewed_listings[k] = result.viewed_listings[k];
                        }
                    }
                }
            }
        }
        // delete from friends_viewed_listings listings that do not exist anymore
        for (let k in friends_viewed_listings) {
            result = await ItemServices.findById(k);
            if (!result) {
                delete friends_viewed_listings[k];
            }
        }
        // finds the 3 most wanted categories for the user and updates his profile in the database
        // let categories_items = Object.keys(categoryCounter).map((key) => {
        //     return [key, categoryCounter[key]];
        // });
        // categories_items.sort((first, second) => {
        //     return second[1] - first[1];
        // });
        // let top_categories = [];
        // for (let k=0; k < 3; k++) {
        //     top_categories.push(categories_items[k][0]);
        // }

        // finds the 5 most wanted keywords that have listings for them in the db
        let keywords_items = Object.keys(keywordCounter).map((key) => {
            return [key, keywordCounter[key]];
        });
        keywords_items.sort((first, second) => {
            return second[1] - first[1];
        });
        let top_keywords_listings = [];
        result = await ItemServices.find();
        for (let k=0; k < keywords_items.length; k++) {
            for (let i = 0; i < result.length; i++) {
                let lower_case_title = result[i].title.toLowerCase();
                if (lower_case_title.includes(keywords_items[k][0])) {
                    top_keywords_listings.push(result[i].id);
                    break;
                }
            }
            if (top_keywords_listings.length === 5) {
                break;
            }
        }

        // finds the 5 (if possible) most viewed listings for updating user recommendations in database
        let listings_items = Object.keys(friends_viewed_listings).map((key) => {
            return [key, friends_viewed_listings[key]];
        });
        listings_items.sort((first, second) => {
            return second[1] - first[1];
        });
        let top_listings = [];
        let size = listings_items.length;
        if (size > 5) {
            size = 5
        }
        for (let k = 0; k < size; k++) {
            top_listings.push(listings_items[k][0]);
        }
        let user_viewed_listings = {}
        result = await User.findById(req.user.id);
        if(result.viewed_listings) {
            user_viewed_listings = result.viewed_listings;
            // delete from the users viewed_listings listings that do not exist anymore
            for (let k in user_viewed_listings) {
                result = await ItemServices.findById(k);
                if (!result) {
                    delete user_viewed_listings[k];
                }
            }
        }
        // get the top 5 viewed listings from the user
        let user_viewed_listings_items = Object.keys(user_viewed_listings).map((key) => {
            return [key, user_viewed_listings[key]];
        });
        user_viewed_listings_items.sort((first, second) => {
            return second[1] - first[1];
        });
        let top_viewed_listings = [];
        for (let k=0; k < 5; k++) {
            top_viewed_listings.push(user_viewed_listings_items[k][0]);
        }

        // add random listings to the lists that are not full
        result = await ItemServices.find();
        if (result) {
            let listings_ids = [];
            for (let i = 0; i < result.length; i++) {
                listings_ids.push(result[i].id);
            }
            size = 5
            if (listings_ids.length < size) {
                size = listings_ids.length;
            }
            let shuffled_listings_ids = listings_ids.slice();
            shuffled_listings_ids = shuffled_listings_ids.sort(() => Math.random() - 0.5);
            let idx = 0;
            while (top_viewed_listings.length < size) {
                let random = shuffled_listings_ids[idx];
                if (!top_viewed_listings.includes(random)) {
                    top_viewed_listings.push(random);
                }
                idx += 1;
            }
            shuffled_listings_ids = shuffled_listings_ids.sort(() => Math.random() - 0.5);
            idx = 0
            while (top_listings.length < size) {
                let random = shuffled_listings_ids[idx];
                if (!top_listings.includes(random)) {
                    top_listings.push(random);
                }
                idx += 1;
            }
            shuffled_listings_ids = shuffled_listings_ids.sort(() => Math.random() - 0.5);
            idx = 0;
            while (top_keywords_listings.length < size) {
                let random = shuffled_listings_ids[idx];
                if (!top_keywords_listings.includes(random)) {
                    top_keywords_listings.push(random);
                }
                idx += 1;
            }
        }
        console.log('update');
        result = await User.findByIdAndUpdate(
            {_id: req.user.id},
            {
                viewed_listings: user_viewed_listings,
                recommended_from_viewed_listings: top_viewed_listings,
                friends_listings: friends_listings,
                recommended_from_friends: top_listings,
                recommended_from_email: top_keywords_listings,
                friends_emails: updated_friends_emails
            }
        )
        res.redirect(redirectURL);
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
router.get('/user/:id', async(req, res) => {
    let user_viewed_listings = {}
    let result = await User.findById(req.params.id);
    if(result.viewed_listings) {
        user_viewed_listings = result.viewed_listings;
        // delete from the users viewed_listings listings that do not exist anymore
        for (let k in user_viewed_listings) {
            result = await ItemServices.findById(k);
            if (!result) {
                delete user_viewed_listings[k];
            }
        }
    }
    result = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {
            viewed_listings: user_viewed_listings,
        }
    )
    User.findById(req.params.id).then((result) => {
        res.send(result);
    })
})

module.exports = router;
