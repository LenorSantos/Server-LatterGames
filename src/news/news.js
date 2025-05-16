const { response } = require("express");
const newsModels = require("../models/news.models");

const News = (res = response, fs) => {
    try {
        // fs.readFile('src/mapmainpage/news.json', (err, data) => {
        //     try {
        //         var predata = new Array(JSON.parse(data));
        //         if (err) {
        //             if (err) throw new Error(err);
        //         } else if (predata[0].length === 0) {
        //             res.status(204).send("{}");
        //         } else {
        //             res.status(200).send(data);
        //         }
        //     } catch (err) {
        //         res.status(400).send(err);
        //     }
        // });

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