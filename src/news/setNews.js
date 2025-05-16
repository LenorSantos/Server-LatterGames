const {request, response} = require("express");
const newsModels = require("../models/news.models");

const setNews = (req = request, res = response, uniqid, fs) => {
    try {

        new newsModels({
            text: req.body.text,
            imgdata: req.body.imgdata,
        }).save().then(result => {
            res.status(201).end();
        }).catch(err => {
            if (err) throw new Error(err);
        });

    } catch (err) {
        res.status(400).send(err ?? "Save promo error");
    }
};

module.exports = { setNews };