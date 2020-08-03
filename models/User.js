const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    needs: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);