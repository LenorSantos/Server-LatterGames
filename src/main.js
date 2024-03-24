const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload');
// const jwt = require("jsonwebtoken");
const uniqid = require('uniqid');
const { promo } = require("./promos");
const { datetime } = require("./datetime");
const { news } = require("./news");

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(fileupload());

// nota, todos os arquivos de banco nosql devem comecar com [] para poder dar inicio corretamente

// datetime
app.post("/setdatetime", (req, res) => {
    datetime.setDateTime(req, res, fs);
});

app.get("/datetime", (req, res) => {
    datetime.dateTime(res, fs);
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
app.post('/setnews', (req, res) => {
    news.setNews(req, res, uniqid, fs);
});

app.delete('/delnews/:id', (req, res) => {
    news.delNews(req, res, fs);
});

app.get("/news", (req, res) => {
    news.News(res, fs);
});

// on server
app.listen(3001, () => {
    console.log("your server is running on port 3001");
});