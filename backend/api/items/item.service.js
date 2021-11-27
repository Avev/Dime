const { randomUUID } = require('crypto');
const gItems = [
  {
    id: randomUUID(),
    name: 'Sapa',
    price: {
      amount: 300,
      currency: 'USD',
    },
  },
  {
    id: randomUUID(),
    name: 'Chair',
    price: {
      amount: 300,
      currency: 'USD',
    },
  },
  {
    id: randomUUID(),
    name: 'Something',
    price: {
      amount: 300,
      currency: 'USD',
    },
  },
];

async function query() {
  try {
    return gItems;
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
}

module.exports = {
  query,
};
