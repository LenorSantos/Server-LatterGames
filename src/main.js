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
const { checktoken } = require("./token/checktoken");
require('dotenv/config');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(fileupload());
const key = cripto();
const port = process.env.PORT || 80;

// nota, quase todos os arquivos de banco nosql devem comecar com [] para poder dar inicio corretamente

// middleware
app.use((req, res, next) => {
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            checktoken(privateKey = key.privateKey, req, res, next);
            break;
        case 'DELETE':
            checktoken(privateKey = key.privateKey, req, res, next);
            // next();
            break;
        default:
            res.status(405).end();
            break;
    }
});

// login
// rgt = REGENTE
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
        }, Buffer.from(req.body.login, 'base64')).toString('utf8') == process.env.REGENTE ? res.status(200).send({token: jwt.sign({rgt: req.query.login}, key.privateKey, {algorithm: 'HS512', expiresIn: "60m"})}) : res.sendStatus(500).end();
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
            datetime.setDateTime(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
});

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

// on server
app.listen(port, () => {
    console.log("your server is running on port 3001");
});