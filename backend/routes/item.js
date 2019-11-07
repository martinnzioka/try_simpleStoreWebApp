const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const itemCtrl = require('../controller/item');

const auth = require('../middleware/auth');

router.post('/', auth, multer, itemCtrl.createItem);
 
router.put('/:id', auth, multer, itemCtrl.updateItem);

router.delete('/:id', auth, itemCtrl.deleteItem);

router.get('/:id', auth, itemCtrl.getOneItem);

router.get('/', auth, itemCtrl.getAll);

module.exports = router;