const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NeedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    userContact: {
        type: String
    }
});

module.exports = Need = mongoose.model('need', NeedSchema);