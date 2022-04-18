const User = require('./User');
const stringGenerator = require('../utils/StringGenerator');
const john = new User(1, 'John', 'Snow', 'john', 'john');
const denerys = new User(2, 'Denerys', 'Targarian', 'deneris', 'deneris');
const sam = new User(3, 'Samwell', 'Tarley', 'sam', 'sam');

let auth = [john, denerys, sam];

module.exports = class UserAuth {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    authenticateUser() {
        let isExistUser = auth.findIndex(a => a.username === this.username);
        if (isExistUser > -1) {
            if (auth[isExistUser].username === this.password) {
                console.log('validated!')
                return stringGenerator(this.username);
            }
            throw new Error('Username not Found')

        }
    }
}