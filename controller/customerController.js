const express = require('express');
const customercontroller = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customerModel');

exports.saveCustomer = (req, res, next) => {
    Customer.find({emailAddress: req.body.emailAddress})
    .exec()
    .then( resp => {
        if(resp.length > 0){
            res.status(409).json({
                errorMessage : 'email already exists'
            });
        }else{
            Customer.find({mobile: req.body.mobile})
            .exec()
            .then(user => {
                if(user.length > 0){
                    res.status(409).json({
                        errorMessage : 'mobile already exists'
                    });
                }else {
                    bcrypt.hash(req.body.password,10,(err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error : err
                        });
                    } else {
                        const user = new Customer({
                            _id: new mongoose.Types.ObjectId(),
                            companyName: req.body.companyName,
                            emailAddress: req.body.emailAddress,
                            password: hash,
                            mobile: req.body.mobile,
                           
                        });
                        user.save().then(result => {
                            res.status(201).json({
                                message : "Customer data saved"
                            });
                        }).catch(err => {
                            res.status(500).json({
                                error : err
                            });
                        })
                    }
                });
            }
        })
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    }) 
};
