const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.spilt(" ") [1];
        const decoded = jwt.verify(token,config.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(error){
        return res.status(404).json({
            errorMessage:"Auth failed, please check your email & password"
        })
    }
}