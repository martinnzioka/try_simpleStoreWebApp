const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Post Successful!'
    });
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'string1',
            title: 'string1',
            description: 'string1',
            imageUrl: '',
            price: 3000,
            userId: '001',
        },
        {
            _id: 'string2',
            title: 'string2',
            description: 'string2',
            imageUrl: '',
            price: 4000,
            userId: '002'
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;