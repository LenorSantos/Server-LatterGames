const {request, response} = require("express");
// const fs = require("fs");
const datetimeModel = require("../models/datetime.model");

// criar uma class para evitar requisitar o express e o fs em todos os arquivos aparenta ser a melhor solução
// const setDateTime = (req = request, res = response) => {
//     try {
//         console.log(req.body);
//         fs.writeFile('src/mapmainpage/datetime.json', `${JSON.stringify(req.body)}`, { flag: 'w' }, (err) => {
//             if (err) throw new Error(err);
//             res.status(200).end();
//         });
//         res.status(200).end();
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };

const setDateTime = (req = request, res = response) => {
    try {
        // fs.writeFile('src/mapmainpage/datetime.json', `${JSON.stringify(req.body)}`, { flag: 'w' }, (err) => {
        //     if (err) throw new Error(err);
        //     res.status(200).end();
        // });

        console.log(req.body);

        new datetimeModel({
            date: req.body.date,
            time: req.body.time,
        }).save().then(result => {
            console.log(result);
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