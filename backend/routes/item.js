const express = require('express');
const router = express.Router();

const Item = require('../models/item');

const itemCtrl = require('../controller/item');

router.post('/', itemCtrl.createItem);
 
router.put('/:id', itemCtrl.updateItem);

router.delete('/:id', itemCtrl.deleteItem);

router.get('/:id', itemCtrl.getOneItem);

router.get('/', itemCtrl.getAll);

module.exports = router;