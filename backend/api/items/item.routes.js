const express = require('express');
const router = express.Router();
const itemController = require('./item.controller');


router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.get('/:category', itemController.getItemsByCategory);
router.post('/', itemController.addItem);
router.delete('/:id', itemController.deleteItem);
router.put('/:id', itemController.updateItem);

module.exports = router;
