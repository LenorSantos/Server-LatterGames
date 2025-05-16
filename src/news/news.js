const { response } = require("express");
const newsModels = require("../models/news.models");

const News = (res = response, fs) => {
    try {

        newsModels.find().then(result => {
            res.status(200).send(result);
        }).catch(err => {
            if (err) throw new Error(err);
        });

    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { News };