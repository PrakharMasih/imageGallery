const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 15,
        minlength: 3,
        match: /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);