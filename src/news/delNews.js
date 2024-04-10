const delNews = (req, res, fs) => {
    try {
        fs.readFile('src/mapmainpage/news.json', (err, data) => {
            if (err) throw new Error(err);
            const alterdata = JSON.parse(data);
            alterdata.forEach((element, index) => {
                if (req.query.id === element.id) {
                    alterdata.splice(index, 1);
                    fs.writeFile('src/mapmainpage/news.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        if (err) throw new Error(err);
                        res.status(200).send("deletado");
                    });
                };
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { delNews };