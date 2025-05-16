const {request, response} = require("express");
const promosModel = require("../models/promos.model");

const sendPromos = (req = request, res = response, uniqid, fs) => {
    try {

        new promosModel({
            title: req.body.title,
            price: req.body.price,
            link: req.body.link,
            percent: req.body.percent,
            imgdata: req.body.imgdata,
        }).save().then(result => {
            res.status(201).end();
        }).catch(err => {
            if (err) throw new Error(err);
        });

    } catch (err) {
        res.status(400).send(err ?? "Save promo error");
    };
};

module.exports = { sendPromos };