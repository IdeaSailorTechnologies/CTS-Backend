const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const productRoutes = require('./api/routes/products');
const customerRoutes = require('./routes/customerRoutes');

mongoose.connect('mongodb://localhost:27017/CTSDB', {useNewUrlParser: true})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested With, Content-Type, Accept, Authorization"
        );
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({});
        }
});

// routes should handle request
//app.use('/products', productRoutes);
app.use('/customers', customerRoutes);


app.use(( req, res,next) =>{
    const error = new error ("Not Found")
    next (error);
});

app.use((error, req, res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })

});

module.exports = app;