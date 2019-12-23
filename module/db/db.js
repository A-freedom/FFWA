var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        minlength: [4, 'username is too short'],
        maxlength: [15, 'username is too long'],
        // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        unique: true

    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        minlength: [4, 'name is too short'],
        maxlength: [15, 'name is too long']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid this isn\'t an email'],
        maxlength: [100, 'password is too long']
    }
});
mongoose.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = {
    user: mongoose.model("user", userSchema),
    error: mongoose.model("error", new mongoose.Schema({
        date: {type: Object, default: Date.now},
        paths: {type: Object},
        error: {type: Object},
        details: {type: Object}
    }))
}
