const mongoose = require('mongoose');

const datetimeSchema = new mongoose.Schema({
    time: { type: String, require: true },
    date: { type: String, require: true }
}, {
    versionKey: false,
});

// para deixar a collection no singular adicionar o nome da collection novamente após a constante
module.exports = mongoose.model('datetime', datetimeSchema, 'datetime');