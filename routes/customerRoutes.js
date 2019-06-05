const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

app.post('/signup', customerController.saveCustomer );
app.get('/');


module.exports = router;