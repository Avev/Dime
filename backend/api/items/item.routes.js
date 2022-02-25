const express = require('express');
const router = express.Router();
const itemController = require('./item.controller');

router.get('/', itemController.getItems);
router.get('/sortByDate', itemController.getItemsSortByDate);
router.get('/sortByLocation', itemController.getItemsSortByLocation);
router.get('/:id', itemController.getItem);
router.get('/:category', itemController.getItemsByCategory);
router.post('/', itemController.addItem);
router.post('/image', itemController.addItemImage);
router.delete('/:id', itemController.deleteItem);
router.put('/:id', itemController.updateItem);

module.exports = router;
