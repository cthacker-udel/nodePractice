const express = require('express');
const app = express.Router();

app.get('/',(req,res) => {
    res.render('index',{title: 'My express app',message: 'hello'});
});

module.exports = app;