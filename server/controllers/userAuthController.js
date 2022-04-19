const UserAuth = require('../models/UserAuth');

exports.authenticateUser = (req, res, next) =>{
 let {username, password} = req.body;
 const userAuth = new UserAuth(username, password);
 const response = userAuth.authenticateUser();
 console.log('Login response :: ', response);
 res.status(200).json(response);
}