const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require('express-fileupload');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promo } = require("./promos");
const { datetime } = require("./datetime");
const { news } = require("./news");
const { cripto } = require("./login/cripto");
const { checktoken } = require("./token/checktoken");
const { connectDB } = require("./mongodb/configMongo");
require('dotenv/config');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(fileupload());
const key = cripto();
const port = process.env.PORT || 80;

// middleware
app.use((req, res, next) => {
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            checktoken(privateKey = key.privateKey, req, res, next);
            // next();
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
        if (err) res.status(500).end();
    }
});

app.post("/login", (req, res) => {
    try {
        // Por enquanto o set de admin terá de reinicializar o sistema visando reiniciar todos os tokens e keys
        crypto.privateDecrypt({
            key: key.privateKey,
            oaepHash: 'sha1',
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            passphrase: process.env.CRYPTO_PASS,
        }, Buffer.from(req.body.login, 'base64')).toString('utf8') == process.env.REGENTE ? res.status(200).send({token: jwt.sign({rgt: req.query.login}, key.privateKey, {algorithm: 'HS512', expiresIn: "60m"})}) : res.sendStatus(500).end();
    } catch (err) {
        if (err) res.status(500).end();
    }
});

// datetime
app.all("/datetime", (req, res) => {
    switch (req.method) {
        case 'GET':
            datetime.dateTime(res);
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
            promo.promos(res);
            break;
        case 'POST':
            promo.sendPromos(req, res);
            break;
        case 'DELETE':
            promo.delPromos(req, res);
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
            news.News(res);
            break;
        case 'POST':
            news.setNews(req, res);
            break;
        case 'DELETE':
            news.delNews(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
});

app.get('/', (req, res) => {
    res.status(200).send("Servidor funcionando, por favor verifique as demais funcionalidades.");
});

// on server
app.listen(port, () => {
    console.log("your server is running on port 3001");
    connectDB();
});