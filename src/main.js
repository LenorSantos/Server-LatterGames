const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uniqid = require('uniqid');
const { promo } = require("./promos");
const { datetime } = require("./datetime");
const { news } = require("./news");
const { cripto } = require("./login/cripto");
require('dotenv/config');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(fileupload());
const key = cripto();

// nota, quase todos os arquivos de banco nosql devem comecar com [] para poder dar inicio corretamente

// login
app.get("/login", (req, res) => {
    try {
        res.status(200).send(key.publicKey)
    } catch (err) {
        // console.log(err);
        if (err) res.status(500).end();
    }
});
app.post("/login", (req, res) => {
    try {
        crypto.privateDecrypt({
            key: key.privateKey,
            oaepHash: 'sha1',
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            passphrase: process.env.CRYPTO_PASS,
        }, Buffer.from(req.body.login, 'base64')).toString('utf8') == process.env.USER ? res.status(200).send({token: jwt.sign({payload: req.query.login}, key.privateKey, {algorithm: 'HS512', expiresIn: "5s"})}) : res.sendStatus(500).end();
    } catch (err) {
        // console.log(err);
        if (err) res.status(500).end();
    }
});

// datetime
app.all("/datetime", (req, res) => {
    switch (req.method) {
        case 'GET':
            datetime.dateTime(res, fs);
            break;
        case 'POST':
            datetime.setDateTime(req, res, fs);
            break;
        default:
            res.status(405).end();
            break;
    }
});

// app.post("/setdatetime", (req, res) => {
//     datetime.setDateTime(req, res, fs);
// });

// app.get("/datetime", (req, res) => {
//     console.log(req.method);
//     datetime.dateTime(res, fs);
// });

// products
app.all('/promos', (req, res) => {
    switch (req.method) {
        case 'GET':
            promo.promos(res, fs);
            break;
        case 'POST':
            promo.sendPromos(req, res, uniqid, fs);
            break;
        case 'DELETE':
            promo.delPromos(req, res, fs);
            break;
        default:
            res.status(405).end();
            break;
    }
});

// app.post('/sendpromos', (req, res) => {
//     promo.sendPromos(req, res, uniqid, fs);
// });

// app.delete('/delpromos/:id', (req, res) => {
//     promo.delPromos(req, res, fs);
// });

// app.get("/promos", (req, res) => {
//     promo.promos(res, fs);
// });

// news
app.all('/news', (req, res) => {
    switch (req.method) {
        case 'GET':
            news.News(res, fs);
            break;
        case 'POST':
            news.setNews(req, res, uniqid, fs);
            break;
        case 'DELETE':
            news.delNews(req, res, fs);
            break;
        default:
            res.status(405).end();
            break;
    }
});

// app.post('/setnews', (req, res) => {
//     news.setNews(req, res, uniqid, fs);
// });

// app.delete('/delnews/:id', (req, res) => {
//     news.delNews(req, res, fs);
// });

// app.get("/news", (req, res) => {
//     news.News(res, fs);
// });

// on server
app.listen(3001, () => {
    console.log("your server is running on port 3001");
});