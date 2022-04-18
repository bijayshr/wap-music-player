module.exports = class User{

    constructor(id, firstname, lastname, username, password) {
        this.id = id;
        this.firstname= firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }
}