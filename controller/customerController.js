const express = require('express');
const customercontroller = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { check, validationResult } = require('express-validator/check');


exports.saveCustomer = (req, res, next) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      return res.status(422).json({ errors: errorsList.array() });
    }

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

exports.loginCustomer = (req, res, next) =>{
    var token;
    Customer.find({ emailAddress: req.body.emailAddress})
    .exec()
    .then(result =>{
        if(result.length != 1){
            res.status(409).json({
                errorMessage:"Auth failed, please check your email"
            })
        }
        bcrypt.compare(req.body.password, result[0].password, (err, success) =>{
            if(!success){
                res.status(409).json({
                    errorMessage:"Auth failed, please check your password"
                })
            }
            if(success){
                token = jwt.sign(
                    {
                        emailAddress : result[0].emailAddress,
                        userId: result[0]._id
                    }, 
                    config.env.JWT_KEY,
                    {
                        expiresIn: "10h"
                    }
                )
                Customer.update({_id: result[0]._id}, {fcmToken: req.body.fcmToken})
                .then(doc=>{
                    res.status(201).json({
                        message:"Login success",
                        _id: result[0]._id,
                        companyName: result[0].companyName,
                        emailAddress: result[0].emailAddress,
                        mobile: result[0].mobile,
                        fcmToken: req.body.fcmToken,
                        jwt: token
                    })
                }).catch(err =>{
                    res.status(500).json({
                        error:err
                    })
                })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            errorMessage:"Auth failed, please check your email & password"
        })
    })

}