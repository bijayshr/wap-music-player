function generateString(username){
    return username+new Date().toString();
}

module.exports = {
    generateString
}