const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload');
const passportSetup = require('./api/auth/auth')
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(cookieSession({
  maxAge: 24*60*60*1000, // session cookie lasts a day in milliseconds
  //***********************************************************
  keys: ['bestEncryptionEver'] // encrypts the ids
  //***********************************************************
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
// take url encoded data and parse to to use as an object
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

const itemRoutes = require('./api/items/item.routes');
app.use('/api/item', itemRoutes);

const authRoutes = require('./api/auth/auth.routes');
app.use('/auth', authRoutes);


// connect to MongoDB

// ***********************************************************
const dbURI = 'mongodb+srv://AvivYarden:AvivYarden@cluster0.tizip.mongodb.net/Cluster0?retryWrites=true&w=majority';
// ***********************************************************
const port = process.env.PORT || 3030;

mongoose.connect(dbURI)
    .then((result) =>
        app.listen(port, () => console.log('Server is running on port: ' + port)))
    .catch((err) => console.log(err));
