const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(fileupload());

// toppage
app.post("/toppage", (req, res) => {
    fs.writeFile('latterdb/toppage.json' ,`${JSON.stringify(req.body)}`, {flag: 'w'}, (err) => {
        if (err) console.log(err);
    });
    res.end();
});

app.get("/pulltoppage", (req, res) => {
    try {
        fs.readFile('latterdb/toppage.json', (err, data) => {
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
// toppage

// promo
var dataimage;
app.post('/image', (req, res) => {
    dataimage = null;
    try {
        const image = req.files.image;
        image.mv(`./img/promo/${image.name}`, () => {
            fs.readFile(`./img/promo/${image.name}`, 'base64', (err, data) => {
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

app.post('/promo', (req, res) => {
    try {
        var datapromo = [req.body];
        if (dataimage == null) {
            fs.rm(`./img/promo${req.body.imgname}`, (err) => {
                if (err) console.log(err);
            });
            res.end("null");
        } else {
            datapromo[0]['imgdata'] = `data:image/png;base64,${dataimage}`;
            fs.readFile('latterdb/promo.json', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const alterdata = JSON.parse(data);
                    var a = false;
                    for (count = 0; count < alterdata.length; count++) {
                        if (req.body.id == alterdata[count].id) {
                            a = true;
                            fs.rm(`./img/promo${req.body.imgname}`, (err) => {
                                if (err) console.log(err);
                            });
                        }
                    }
                    if (a == false) {
                        alterdata.push(datapromo[0]);
                        fs.writeFile('latterdb/promo.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                fs.rm(`./img/promo/${req.body.imgname}`, (err) => {
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
        fs.rm(`./img/promo/${req.body.imgname}`, (err) => {
            if (err) console.log(err);
        });
        res.end(`${error}`);
    }

    
});

app.post('/deletepromo', (req, res) => {
    try {
        fs.readFile('latterdb/promo.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const alterdata = JSON.parse(data);
                for (count = 0; count < alterdata.length; count++) {
                    if (req.body.id == alterdata[count].id) {
                        alterdata.splice(count, 1);
                        fs.writeFile('latterdb/promo.json' ,`${JSON.stringify(alterdata)}`, {flag: 'w'}, (err) => {
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

app.get("/pullpromo", (req, res) => {
    try {
        fs.readFile('latterdb/promo.json', (err, data) => {
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
// promo

// destques

var dataimgdestaques;
app.post('/imgdestaques', (req, res) => {
    dataimgdestaques = null;
    try {
        const imgnew = req.files.imgnew;
        imgnew.mv(`./img/destaques/${imgnew.name}`, () => {
            fs.readFile(`./img/destaques/${imgnew.name}`, 'base64', (err, data) => {
                if (err) {
                    console.log("readfile" + err);
                } else {
                    dataimgdestaques = data;
                }
            });
            res.end();
        });
    } catch (error) {
        res.end(`${error}`);
    }
});

app.post('/destaques', (req, res) => {
    try {
        var datadestaques = [req.body];
        if (dataimgdestaques == null) {
            fs.rm(`./img/destaques/${req.body.imgname}`, (err) => {
                if (err) console.log(err);
            });
            res.end("null");
        } else {
            datadestaques[0]['imgdata'] = `data:image/png;base64,${dataimgdestaques}`;
            fs.readFile('latterdb/destaques.json', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const alterdata = JSON.parse(data);
                    var a = false;
                    for (count = 0; count < alterdata.length; count++) {
                        if (req.body.id == alterdata[count].id) {
                            a = true;
                            fs.rm(`./img/destaques/${req.body.imgname}`, (err) => {
                                if (err) console.log(err);
                            });
                        }
                    }
                    if (a == false) {
                        alterdata.push(datadestaques[0]);
                        fs.writeFile('latterdb/destaques.json', `${JSON.stringify(alterdata)}`, { flag: 'w' }, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                fs.rm(`./img/destaques/${req.body.imgname}`, (err) => {
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
        fs.rm(`./img/destaques/${req.body.imgname}`, (err) => {
            if (err) console.log(err);
        });
        res.end(`${error}`);
    }
});

app.post('/deldestaques', (req, res) => {
    try {
        fs.readFile('latterdb/destaques.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const alterdata = JSON.parse(data);
                for (count = 0; count < alterdata.length; count++) {
                    if (req.body.id == alterdata[count].id) {
                        alterdata.splice(count, 1);
                        fs.writeFile('latterdb/destaques.json' ,`${JSON.stringify(alterdata)}`, {flag: 'w'}, (err) => {
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

app.get("/pulldestaques", (req, res) => {
    try {
        fs.readFile('latterdb/destaques.json', (err, data) => {
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
// destaques

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});