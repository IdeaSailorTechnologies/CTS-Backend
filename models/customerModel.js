const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    companyName:{type:String, required:true},
    emailAddress: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true
    },
    password :  {type:String, required:true, match: /[0-9a-zA-Z@~!@#$%^&*()_+=|\]\-\[{}';/.,<>?":\\`]{8,}$/},
    mobile: {type:String, required:true, match: /^[0-9]{10}$/, unique:true},
    
}) 
module.exports = mongoose.model('customer', customerSchema);