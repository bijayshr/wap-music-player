const path = require('path');

exports.redirectToDashboard = (req, res, next) =>{
    let page = path.join(__dirname, "..", "..", "client", "dashboard.html");
    res.status(200).sendFile(page);
}