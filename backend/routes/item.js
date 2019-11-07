const express = require('express');
const router = express.Router();

const itemCtrl = require('../controller/item');

const auth = require('../middleware/auth');

router.post('/', auth, itemCtrl.createItem);
 
router.put('/:id', auth, itemCtrl.updateItem);

router.delete('/:id', auth, itemCtrl.deleteItem);

router.get('/:id', auth, itemCtrl.getOneItem);

router.get('/', auth, itemCtrl.getAll);

module.exports = router;