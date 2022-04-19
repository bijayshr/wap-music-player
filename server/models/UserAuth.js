const User = require('./User');
const StringUtil = require('../utils/StringGenerator');
const john = new User('John', 'Snow', 'john', 'john');
const denerys = new User('Denerys', 'Targarian', 'deneris', 'deneris');
const sam = new User('Samwell', 'Tarley', 'sam', 'sam');
const a = new User('a', 'a', 'a', 'a');

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
                let generatedSecret = StringUtil.generateString(this.username);
                auth[isExistUser].secret = generatedSecret;
                return generatedSecret;
            }
            throw new Error('Incorrect Username or Password.')
        }
    }

    static isAuthenticated(secret){
        let isAuthenticated = auth.findIndex(user => user.secret==secret);
        return (isAuthenticated > -1)? true: false;
  
    }

    static findUsernameBySecret(secret){
        let isExist = auth.findIndex(user => user.secret==secret);
        if (isExist > -1){
            return auth[isExist].username;
        } 
        throw new Error ('Invalid Credentials. Please try again!');
    }

}