const mongoose = require('mongoose');

const customerSchema = mongoos.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName:{type:String, required:true},
    companyName:{type:String, required:true},
    contactEmail: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true
    },
    telephone:{
        type:String,
        required:true,
        match:/^[0-9]\d{2,4}-\d{6,8}$/,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        match: /^[0-9]{10}$/,
        unique:true
    },
    websiteUrl:{type:String, required:true},
    billingAddress:{
        state: {type:String, required:true},
        city: {type:String, required:true},
        address: {type:String, required:true},
        pincode: {type:Number, required:true}
        
    },
    shippingAddress:{
        state: {type:String, required:true},
        city: {type:String, required:true},
        address: {type:String, required:true},
        pincode: {type:Number, required:true}
        
    },
    cinNo:{type:String, required:true},
    panNo:{type:String, required:true},
    companyGstnNo:{type:String, required:true},
    attachment:{type:String, required:false},
    notes:{type:String, required:false}
}) 
module.exports = mongoose.model('customer', customerSchema);