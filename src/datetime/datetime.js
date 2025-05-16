const datetimeModel = require("../models/datetime.model");

const dateTime = (res, fs) => {
    try {

        datetimeModel.find().then(result => {
            res.status(200).send({
                time: result[0].time,
                date: result[0].date,
            });
        }).catch(err => {
            if (err) throw new Error(err);
        });
        
    } catch (err) {
        res.status(400).send(err ?? "impossivel requisitar data e hora");
    };
};

module.exports = { dateTime };