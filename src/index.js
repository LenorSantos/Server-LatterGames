const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(fileupload());

// nota, todos os arquivos de banco nosql devem comecar com [] para poder dar inicio corretamente

// datetime
app.post("/setdatetime", (req, res) => {
    console.log(req.body);
    fs.writeFile('src/mapmainpage/datetime.json' ,`${JSON.stringify(req.body)}`, {flag: 'w'}, (err) => {
        if (err) console.log(err);
    });
    res.end();
});

app.get("/datetime", (req, res) => {
    try {
        fs.readFile('src/mapmainpage/datetime.json', (err, data) => {
            try {
                if (err) {
                    console.log(err);
                } else {
                    res.end(data);
                };
            } catch (error) {
                res.end();
            };
        });
    } catch (error) {
        res.end(`${error}`);
    };
});
// datetime

// products
app.post('/sendpromos', (req, res) => {
    try {
        var dataproducts = [req.body];
        req.files.img.mv(`src/temp/${req.files.img.name}`, (err) => {
            if (err) throw new Error(err);
            fs.readFile(`src/temp/${req.files.img.name}`, 'base64', (err, data) => {
                if (err) throw new Error(err);
                dataproducts[0]['id'] = `${jwt.sign(req.body, `${req.body.title}`)}`;
                dataproducts[0]['imgdata'] = `data:image/png;base64,${data}`;
                fs.readFile('src/mapmainpage/products.json', (err, data) => {
                    if (err) throw new Error(err);
                    const alterdata = JSON.parse(data);
                    alterdata.push(dataproducts[0]);
                    fs.writeFile('src/mapmainpage/products.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        fs.rm(`src/temp/${req.files.img.name}`, (err) => {if (err) throw new Error(err)});
                        if (err) throw new Error(err);
                        res.status(201).end();
                    });
                });
            });
        });
    } catch (err) {
        res.status(400).send(err ?? "Save promo error");
    };
    
});

app.delete('/delproducts/:id', (req, res) => {
    try {
        fs.readFile('src/mapmainpage/products.json', (err, data) => {
            if (err) throw new Error(err);
            const alterdata = JSON.parse(data);
            alterdata.forEach((element, index) => {
                if (req.params.id === element.id) {
                    alterdata.splice(index, 1);
                    fs.writeFile('src/mapmainpage/products.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        if (err) throw new Error(err);
                        res.status(200).send("deletado");
                    });
                };
            });
        });
    } catch (err) {
        res.status(400).send(err);
    };
    
});

app.get("/promos", (req, res) => {
    try {
        fs.readFile('src/mapmainpage/products.json', (err, data) => {
            try {
                var predata = new Array(JSON.parse(data));
                if (err) {
                    if (err) throw new Error(err);
                } else if (predata[0].length === 0) {
                    res.status(204).send("{}");
                } else {
                    res.status(200).send(data);
                }
            } catch (err) {
                res.status(400).send(err);
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});
// products

// news

// the section is ctrl-c + ctrl-v with some differences
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
// news

app.listen(3001, () => {
    console.log("your server is running on port 3001");
});