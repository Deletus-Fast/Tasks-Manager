const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
