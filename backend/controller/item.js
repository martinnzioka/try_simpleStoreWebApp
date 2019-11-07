const Item = require('../models/item');
const fs = require('fs');


exports.createItem = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
    const item = new Item({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.thing.userId,
        price: req.body.thing.price
    });
 
    item.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
             });
        }
    );
}

exports.updateItem = (req, res, next) => {

    let item = new Item({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.thing = JSON.parse(req.body.thing);
        item = {
            _id: req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            userId: req.body.thing.userId,
            price: req.body.thing.price
        };
    } else {
        item = {
            _id: req.params.id, // maintaining the same id
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId,
            price: req.body.price
        };
    }
    
    Item.updateOne({_id: req.params.id}, item).then(
        () => {
            res.status(201).json({
                message: 'Item updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

exports.deleteItem = (req, res, next) => {
    Item.findOne( {_id: req.params.id} ).then(
        (item) => {
            const filename = item.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Item.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        })
                    }
                )
            });
        }
    )
   
}

exports.getOneItem = (req, res, next) => {
    Item.findOne({
        _id: req.params.id
    }).then(
        (item) => {
            res.status(200).json(item);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.getAll = (req, res, next) => {
    Item.find().then(
        (items) => {
            res.status(200).json(items);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        });
}