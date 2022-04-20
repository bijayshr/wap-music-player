const { send } = require('express/lib/response');
const User = require('../models/User');

exports.authenticateUser = (req, res, next) =>{
 let {username, password} = req.body;
 const user = User.login(username, password);
 res.status(200).json({secret:user.secret,fullname:user.fullname});
}

exports.logout = (req,res,next) =>{
    User.logout( req.headers['secret']);
    res.status(200).send();
} 