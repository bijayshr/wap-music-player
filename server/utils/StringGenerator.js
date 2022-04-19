const moment = require('moment');

function generateString(username){
    return username+ "-" + moment(new Date()).format();
}

module.exports = {
    generateString
}