const UserAuth = require('../models/UserAuth');

exports.authenticateUser = (req, res, next) =>{
 let username = req.body.username;
 let password = req.body.password;
 console.log(username);
 console.log(password)
 const userAuth = new UserAuth(username, password);
 res.status(200).json(userAuth.authenticateUser());
}