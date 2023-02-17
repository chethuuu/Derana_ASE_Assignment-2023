const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    userRole: {
        type: String,
        required: true,
        default: 0
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

module.exports = mongoose.model('User', userSchema);