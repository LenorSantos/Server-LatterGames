const setDateTime = (req, res, fs) => {
    try {
        console.log(req.body);
        fs.writeFile('src/mapmainpage/datetime.json', `${JSON.stringify(req.body)}`, { flag: 'w' }, (err) => {
            if (err) throw new Error(err);
            res.status(200).end();
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { setDateTime };