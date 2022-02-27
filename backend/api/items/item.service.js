const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema of the listing, which fields are required or optional to fill when creating or watching a listing
const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        // userId: {
        //     type: String,
        //     required: true,
        // },
    },
  { timestamps: true }
);

// listing model
const ItemServices = mongoose.model('Listing', listingSchema);
module.exports = ItemServices;
