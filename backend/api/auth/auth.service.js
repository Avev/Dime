const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email: String,
    friends_emails: [],
    recommended_from_friends: [],
    recommended_from_email: [],
    viewed_listings: Object,
    tokens: Object
});

const User = mongoose.model('user', userSchema);

module.exports = User;
