const {request, response} = require("express");
const datetimeModel = require("../models/datetime.model");

const setDateTime = (req = request, res = response) => {
    try {

        new datetimeModel({
            date: req.body.date,
            time: req.body.time,
        }).save().then(result => {
            res.status(200).end();
        }).catch(err => {
            if (err) throw new Error(err);
        });

        res.status(200).end();
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { setDateTime };