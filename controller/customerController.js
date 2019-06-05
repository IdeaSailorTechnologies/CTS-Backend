const express = require('express');
const customercontroller = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customerModel');


exports.saveCustomer = (req, res, next) =>{
    Customer.find({email: req.body.email})
    .exec()
    .then(resp =>{
        if(resp.length > 0){
            res.status(409).json({
                erorMessage:"Email already exists"
            })
        }else{
            Customer.find({mobile: req.body.mobile})
            .exec()
            .then(user =>{
                if(user.length > 0){
                    res.status(409).json({
                        erorMessage:"Mobile already exists"
                    })
                }else{
                    bcrypt.hash(req.body.password,10,(err, hash)=>{
                        if(err){
                            res.status(500).json({
                                error:err
                            })
                        } else{
                            const user = new Customer({
                                _id: new mongoose.Types.ObjectId(),
                                clientName: req.body.clientName,
                                companyName: req.body.companyName,
                                contactEmail: req.body.contactEmail,
                                telephone: req.body.telephone,
                                mobile: req.body.mobile,
                                websiteUrl: req.body.websiteUrl,
                                billingAddress: req.body.billingAddress,
                                shippingAddress: req.body.shippingAddress,
                                cinNo: req.body.cinNo,
                                panNo: req.body.panNo,
                                companyGstnNo: req.body.companyGstnNo,
                                attachment: req.body.attachment,
                                notes: req.body.notes
                            })
                            user.save().then(result =>{
                                res.status()
                            });
                        }
                    });
                }
            });
        }
    })
    .catch()
}