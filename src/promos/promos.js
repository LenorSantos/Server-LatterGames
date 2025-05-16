const { response } = require("express");
const promosModel = require("../models/promos.model");

const promos = (res = response, fs) => {
    try {
        
        promosModel.find().then(result => {
            res.status(200).send(result);
        }).catch(err => {
            if (err) throw new Error(err);
        });

    } catch (err) {
        res.status(400).send(err ?? "impossivel requisitar as promoções");
    }
}

module.exports = { promos };