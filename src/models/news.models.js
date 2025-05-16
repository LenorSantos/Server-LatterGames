const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    imgdata: { type: String },
    text: { type: String },
}, {
  versionKey: false,
});

module.exports = mongoose.model('news', newsSchema,);