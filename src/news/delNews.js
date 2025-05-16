const {request, response} = require("express");
const newsModels = require("../models/news.models");

const delNews = (req = request, res = response, fs) => {
    try {

        newsModels.deleteOne({
            _id: req.query.id
        }).then(result => {
            res.status(200).end();
        }).catch(err => {
            if (err) throw new Error(err);
        });

    } catch (err) {
        res.status(400).send(err ?? "Erro drop news");
    }
};

module.exports = { delNews };