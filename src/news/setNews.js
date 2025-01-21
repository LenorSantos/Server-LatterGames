const setNews = (req, res, uniqid, fs) => {
    try {
        var datanews = [req.body];
        req.files.img.mv(`temp/${req.files.img.name}`, (err) => {
            if (err) throw new Error(err);
            fs.readFile(`temp/${req.files.img.name}`, 'base64', (err, data) => {
                if (err) throw new Error(err);
                datanews[0]['id'] = `${uniqid(req.body.title)}`;
                datanews[0]['imgdata'] = `data:image/png;base64,${data}`;
                fs.readFile('src/mapmainpage/news.json', (err, data) => {
                    if (err) throw new Error(err);
                    const alterdata = JSON.parse(data);
                    alterdata.push(datanews[0]);
                    fs.writeFile('src/mapmainpage/news.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        fs.rm(`temp/${req.files.img.name}`, (err) => {if (err) throw new Error(err)});
                        if (err) throw new Error(err);
                        res.status(201).end();
                    });
                });
            });
        });
    } catch (err) {
        res.status(400).send(err ?? "Save promo error");
    }
};

module.exports = { setNews };