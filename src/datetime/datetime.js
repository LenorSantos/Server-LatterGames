const dateTime = (res, fs) => {
    try {
        fs.readFile('src/mapmainpage/datetime.json', (err, data) => {
            if (err) throw new Error(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err ?? "impossivel requisitar data e hora");
    };
};

module.exports = { dateTime };