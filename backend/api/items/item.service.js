// const { randomUUID } = require('crypto');
// const gItems = [
//   {
//     id: randomUUID(),
//     name: 'Sapa',
//     price: {
//       amount: 300,
//       currency: 'USD',
//     },
//   },
//   {
//     id: randomUUID(),
//     name: 'Chair',
//     price: {
//       amount: 300,
//       currency: 'USD',
//     },
//   },
//   {
//     id: randomUUID(),
//     name: 'Something',
//     price: {
//       amount: 300,
//       currency: 'USD',
//     },
//   },
// ];
//
// async function query() {
//   try {
//     return gItems;
//   } catch (err) {
//     console.log('err: ', err);
//     throw err;
//   }
// }
//
// module.exports = {
//   query,
// };

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// schema of the listing, which fields are required or optional to fill when creating or watching a listing
const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
}, {timestamps: true})

// listing model
const ItemServices = mongoose.model('Listing', listingSchema);
module.exports = ItemServices;