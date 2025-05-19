const mongoose = require('mongoose');

const criptoSchema = new mongoose.Schema({
    publicKey: { type: String },
    privateKey: { type: String },
    createdAt: { type: Date }
}, {
    versionKey: false,
});

module.exports = mongoose.model('cripto', criptoSchema, 'cripto');