module.exports = class User{

    constructor(userId, firstname, lastname, username, password) {
        this.userId = userId;
        this.firstname= firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }
}