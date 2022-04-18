function generateString(username){
    let generatedString = username+new Date();
    console.log('Generated String :: ', generatedString);
    return generatedString;
}

module.exports = generateString;