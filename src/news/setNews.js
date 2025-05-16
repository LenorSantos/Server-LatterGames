const {request, response} = require("express");
const newsModels = require("../models/news.models");

const setNews = (req = request, res = response, uniqid, fs) => {
    try {
        // var datanews = [req.body];
        // req.files.img.mv(`temp/${req.files.img.name}`, (err) => {
        //     if (err) throw new Error(err);
        //     fs.readFile(`temp/${req.files.img.name}`, 'base64', (err, data) => {
        //         if (err) throw new Error(err);
        //         datanews[0]['id'] = `${uniqid(req.body.title)}`;
        //         datanews[0]['imgdata'] = `data:image/png;base64,${data}`;
        //         fs.readFile('src/mapmainpage/news.json', (err, data) => {
        //             if (err) throw new Error(err);
        //             const alterdata = JSON.parse(data);
        //             alterdata.push(datanews[0]);
        //             fs.writeFile('src/mapmainpage/news.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
        //                 fs.rm(`temp/${req.files.img.name}`, (err) => {if (err) throw new Error(err)});
        //                 if (err) throw new Error(err);
        //                 res.status(201).end();
        //             });
        //         });
        //     });
        // });

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