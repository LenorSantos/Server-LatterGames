const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');
// const jwt = require("jsonwebtoken");
const uniqid = require('uniqid');
const { promo } = require("./promos");

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(fileupload());

// nota, todos os arquivos de banco nosql devem comecar com [] para poder dar inicio corretamente

// datetime
app.post("/setdatetime", (req, res) => {
    try {
        console.log(req.body);
        fs.writeFile('src/mapmainpage/datetime.json', `${JSON.stringify(req.body)}`, { flag: 'w' }, (err) => {
            if (err) throw new Error(err);
            res.status(200).end();
        });
    } catch (err) {
        res.status(400).send(err);
    }

});

app.get("/datetime", (req, res) => {
    try {
        fs.readFile('src/mapmainpage/datetime.json', (err, data) => {
            if (err) throw new Error(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err ?? "impossivel requisitar data e hora");
    };
});

// products
app.post('/sendpromos', (req, res) => {
    promo.sendPromos(req, res, uniqid, fs);
});

app.delete('/delpromos/:id', (req, res) => {
    promo.delPromos(req, res, fs);
});

app.get("/promos", (req, res) => {
    promo.promos(res, fs);
});

// news
var dataimgnews;
app.post('/imgnews', (req, res) => {
    dataimgnews = null;
    try {
        const imgnew = req.files.imgnew;
        imgnew.mv(`./img/news/${imgnew.name}`, () => {
            fs.readFile(`./img/news/${imgnew.name}`, 'base64', (err, data) => {
                if (err) {
                    console.log("readfile" + err);
                } else {
                    dataimgnews = data;
                }
            });
            res.end();
        });
    } catch (error) {
        res.end(`${error}`);
    }
});

app.post('/news', (req, res) => {
    try {
        var datanews = [req.body];
        if (dataimgnews == null) {
            fs.rm(`./img/news/${req.body.imgname}`, (err) => {
                if (err) console.log(err);
            });
            res.end("null");
        } else {
            datanews[0]['imgdata'] = `data:image/png;base64,${dataimgnews}`;
            fs.readFile('src/mapmainpage/news.json', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const alterdata = JSON.parse(data);
                    var a = false;
                    for (count = 0; count < alterdata.length; count++) {
                        if (req.body.id == alterdata[count].id) {
                            a = true;
                            fs.rm(`./img/news/${req.body.imgname}`, (err) => {
                                if (err) console.log(err);
                            });
                        }
                    }
                    if (a == false) {
                        alterdata.push(datanews[0]);
                        fs.writeFile('src/mapmainpage/news.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                fs.rm(`./img/news/${req.body.imgname}`, (err) => {
                                    if (err) console.log(err);
                                });
                            }
                        });
                    }
                }
            });
            res.end();
        }
    } catch (error) {
        fs.rm(`./img/news/${req.body.imgname}`, (err) => {
            if (err) console.log(err);
        });
        res.end(`${error}`);
    }
});

app.post('/delnews', (req, res) => {
    try {
        fs.readFile('src/mapmainpage/news.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const alterdata = JSON.parse(data);
                for (count = 0; count < alterdata.length; count++) {
                    if (req.body.id == alterdata[count].id) {
                        alterdata.splice(count, 1);
                        fs.writeFile('src/mapmainpage/news.json' ,`${JSON.stringify(alterdata)}`, {flag: 'w'}, (err) => {
                            if (err) console.log(err);
                        });
                    }
                }
            }
        });
        res.end();
    } catch (error) {
        res.end(`${error}`);
    }
});

app.get("/pullnews", (req, res) => {
    try {
        fs.readFile('src/mapmainpage/news.json', (err, data) => {
            try {
                var predata = new Array(JSON.parse(data));
                if (err) {
                    if (err) throw new Error(err);
                } else if (predata[0].length === 0) {
                    res.status(204).send("{}");
                } else {
                    res.end(data);
                }
            } catch (error) {
                res.status(400).send(err);
            }
        });
    } catch (error) {
        res.status(400).send(err);
    }
});

// on server
app.listen(3001, () => {
    console.log("your server is running on port 3001");
});