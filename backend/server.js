const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload');
// const listingRoutes = require('./routes/listingRoutes');
// const http = require('http').createServer(app);

const port = process.env.PORT || 3030;

app.use(express.json());
// take url encoded data and parse to to use as an object
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

// listing routes
// app.use(listingRoutes);
// app.use('/listings', listingRoutes); // scopes it to the given route /listings in this case

const itemRoutes = require('./api/items/item.routes');
app.use('/api/item', itemRoutes);



// http.listen(port, () => {
//   console.log('Server is running on port: ' + port);
// });

// connect to MongoDB
const dbURI = 'mongodb+srv://AvivYarden:AvivYarden@cluster0.tizip.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) =>
        app.listen(port, () => console.log('Server is running on port: ' + port)))
    .catch((err) => console.log(err));
