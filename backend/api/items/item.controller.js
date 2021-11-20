const itemService = require('./item.service');

async function getItems(req, res) {
  try {
    const items = await itemService.query();
    res.send(items);
  } catch (err) {
    res.status(500).send({ err: 'Failed to get items' });
  }
}

module.exports = {
  getItems,
};
