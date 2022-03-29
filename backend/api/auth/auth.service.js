const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email: String,
    friends_emails: [],
    friends_listings: [],
    recommended_from_friends: [],
    recommended_from_email: [],
    recommended_from_viewed_listings: [],
    viewed_listings: Object,
    tokens: Object
});

const User = mongoose.model('user', userSchema);

module.exports = User;
