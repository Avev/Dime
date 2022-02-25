const ItemServices = require('../api/items/item.service');
const mongoose = require('mongoose');

const script = () => {
  const dbURI =
    'mongodb+srv://AvivYarden:AvivYarden@cluster0.tizip.mongodb.net/Cluster0?retryWrites=true&w=majority';
  mongoose
    .connect(dbURI)
    .then((result) => {
      ItemServices.deleteMany({
        $or: [
          { description: { $regex: 'test' } },
          { title: { $regex: 'test' } },
        ],
      })
        .then((res) => {
          console.log('res:', res);
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    })
    .catch((err) => console.log(err));
};

script();
