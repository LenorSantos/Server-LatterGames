const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    imgdata: { type: String },
    text: { type: String },
}, {
  versionKey: false,
});

// para deixar a collection no singular adicionar o nome da collection novamente após a constante
module.exports = mongoose.model('news', newsSchema,);