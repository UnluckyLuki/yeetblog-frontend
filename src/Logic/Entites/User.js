


class User {
    constructor(id, name, password, email) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    toJSON(){
        return {
            id: this._id,
            name: this._name,
            password: this._password,
            email: this._email
        };
    }
}

export default User;