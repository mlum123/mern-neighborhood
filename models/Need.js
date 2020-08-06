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
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = Need = mongoose.model('need', NeedSchema);