const sendPromos = (req, res, uniqid, fs) => {
    try {
        var dataproducts = [req.body];
        req.files.img.mv(`temp/${req.files.img.name}`, (err) => {
            if (err) throw new Error(err);
            fs.readFile(`temp/${req.files.img.name}`, 'base64', (err, data) => {
                if (err) throw new Error(err);
                dataproducts[0]['id'] = `${uniqid(req.body.title)}`;
                dataproducts[0]['imgdata'] = `data:image/png;base64,${data}`;
                fs.readFile('src/mapmainpage/products.json', (err, data) => {
                    if (err) throw new Error(err);
                    const alterdata = JSON.parse(data);
                    alterdata.push(dataproducts[0]);
                    fs.writeFile('src/mapmainpage/products.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        fs.rm(`temp/${req.files.img.name}`, (err) => {if (err) throw new Error(err)});
                        if (err) throw new Error(err);
                        res.status(201).end();
                    });
                });
            });
        });
    } catch (err) {
        res.status(400).send(err ?? "Save promo error");
    };
};

module.exports = { sendPromos };