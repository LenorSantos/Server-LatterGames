const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(fileupload());

// datetime
app.post("/datetime", (req, res) => {
    console.log(req.body);
    fs.writeFile('mapmainpage/datetime.json' ,`${JSON.stringify(req.body)}`, {flag: 'w'}, (err) => {
        if (err) console.log(err);
    });
    res.end();
});

app.get("/pulldatetime", (req, res) => {
    try {
        fs.readFile('mapmainpage/datetime.json', (err, data) => {
            try {
                if (err) {
                    console.log(err);
                } else {
                    res.end(data);
                }
            } catch (error) {
                res.end();
            }
        });
    } catch (error) {
        res.end(`${error}`);
    }
});
// datetime

// products
var dataimage;
app.post('/image', (req, res) => {
    dataimage = null;
    try {
        const image = req.files.image;
        image.mv(`./img/products/${image.name}`, () => {
            // the image is enconded
            fs.readFile(`./img/products/${image.name}`, 'base64', (err, data) => {
                if (err) {
                    console.log("readfile" + err);
                } else {
                    dataimage = data;
                }
            });
        });
        res.end();
    } catch (error) {
        res.end(`${error}`);
    }
});

app.post('/sendpromos', (req, res) => {
    try {
        var dataproducts = [req.body];
        req.files.img.mv(`./temp/${req.files.img.name}`, (err) => {
            if (err) throw new Error(err);
            fs.readFile(`./temp/${req.files.img.name}`, 'base64', (err, data) => {
                if (err) throw new Error(err);
                dataproducts[0]['imgdata'] = `data:image/png;base64,${data}`;
                fs.readFile('mapmainpage/products.json', (err, data) => {
                    if (err) throw new Error(err);
                    const alterdata = JSON.parse(data);
                    alterdata.push(dataproducts[0]);
                    fs.writeFile('mapmainpage/products.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                        if (err) throw new Error(err);
                        res.end();
                    });
                });
                fs.rm(`./temp/${req.files.img.name}`, (err) => {if (err) throw new Error(err)});
            });
        });
    } catch (err) {
        res.send(err ?? "Save promo error");
    }
    
});

app.post('/deleteproducts', (req, res) => {
    try {
        fs.readFile('mapmainpage/products.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const alterdata = JSON.parse(data);
                for (count = 0; count < alterdata.length; count++) {
                    if (req.body.id == alterdata[count].id) {
                        alterdata.splice(count, 1);
                        fs.writeFile('mapmainpage/products.json' ,`${JSON.stringify(alterdata)}`, {flag: 'w'}, (err) => {
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

app.get("/promos", (req, res) => {
    try {
        fs.readFile('mapmainpage/products.json', (err, data) => {
            try {
                var predata = new Array(JSON.parse(data));
                if (err) {
                    console.log(err);
                } else if (predata[0].length === 0) {
                    res.end("{}");
                } else {
                    res.end(data);
                }
            } catch (error) {
                console.log(error)
                res.end();
            }
        });
    } catch (error) {
        res.end(`${error}`);
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
            fs.readFile('mapmainpage/news.json', (err, data) => {
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
                        fs.writeFile('mapmainpage/news.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
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
        fs.readFile('mapmainpage/news.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const alterdata = JSON.parse(data);
                for (count = 0; count < alterdata.length; count++) {
                    if (req.body.id == alterdata[count].id) {
                        alterdata.splice(count, 1);
                        fs.writeFile('mapmainpage/news.json' ,`${JSON.stringify(alterdata)}`, {flag: 'w'}, (err) => {
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
        fs.readFile('mapmainpage/news.json', (err, data) => {
            try {
                var predata = new Array(JSON.parse(data));
                if (err) {
                    console.log(err);
                } else if (predata[0].length === 0) {
                    res.end("{}");
                } else {
                    res.end(data);
                }
            } catch (error) {
                console.log(error);
                res.end();
            }
        });
    } catch (error) {
        res.end(`${error}`);
    }
});
// news

app.listen(3001, () => {
    console.log("your server is running on port 3001");
});