const {request, response} = require("express");
const promosModel = require("../models/promos.model");

const delPromos = (req = request, res = response, fs) => {
    try {

        promosModel.deleteOne({
            _id: req.query.id
        }).then(result => {
            res.status(200).end();
        }).catch(err => {
            if (err) throw new Error(err);
        })

    } catch (err) {
        res.status(400).send(err ?? 'impossivel apagar promoção selecionada');
    };
};

module.exports = { delPromos };