'use strict';

const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bodyParser = require("body-parser");
const {postData, buildPayload} = require('./afterPayCheckOut');

// Load static assest 
app.use(express.static(path.join(__dirname, 'dist')));

// Parse req.body 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200);
    res.sendFile(path.join(__dirname, './client/static/index.html'));
});

app.get('*', function (req, res) {
    res.redirect('/');
});

// Post data to AfterPay Sandbox api
app.post('/card', (req, res) => {
    
    let address = req.body.address,
        card = req.body.card,
        data = buildPayload(card, address);
        
    postData(data, function (response) {
        if (response && response.httpStatusCode >= 400) {
            res.status(400);
            res.json(response);
            return;
        }
        res.json(response);
    });
});

app.listen(port, function(){
       console.log(`Server Started on ${port}`); 
});

