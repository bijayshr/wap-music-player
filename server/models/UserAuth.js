const User = require('./User');
const StringUtil = require('../utils/StringGenerator');
const john = new User(1, 'John', 'Snow', 'john', 'john');
const denerys = new User(2, 'Denerys', 'Targarian', 'deneris', 'deneris');
const sam = new User(3, 'Samwell', 'Tarley', 'sam', 'sam');
const a = new User(4, 'a', 'a', 'a', 'a');

let auth = [john, denerys, sam, a];

module.exports = class UserAuth {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    authenticateUser() {
        let isExistUser = auth.findIndex(a => a.username === this.username);
        if (isExistUser > -1) {
            if (auth[isExistUser].username === this.password) {
                let generatedString = StringUtil.generateString(this.username);
                console.log('Gen Key: ', generatedString);
                return generatedString;
            }
            throw new Error('Incorrect Username or Password.')

        }
    }
}