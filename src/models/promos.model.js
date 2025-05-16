const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    imgdata: { type: String },
    percent: { type: String },
    title: { type: String },
    price: { type: String },
    link: { type: String },
}, {
  versionKey: false,
});

// para deixar a collection no singular adicionar o nome da collection novamente após a constante
module.exports = mongoose.model('promo', promoSchema,);