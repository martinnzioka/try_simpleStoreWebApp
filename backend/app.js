const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const itemRoute = require('./routes/item');

mongoose.connect('mongodb+srv://api:8bpBvgJI3MO5toYx@cluster0-wfjg2.gcp.mongodb.net/test?retryWrites=true&w=majority').then(() => 
    {
        console.log('Successfully connected to MondoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/stuff', itemRoute);

module.exports = app;