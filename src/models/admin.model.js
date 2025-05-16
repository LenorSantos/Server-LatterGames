const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: String },
}, {
    versionKey: false,
});

module.exports = mongoose.model('user', userSchema, 'user');