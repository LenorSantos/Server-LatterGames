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

module.exports = mongoose.model('promo', promoSchema,);