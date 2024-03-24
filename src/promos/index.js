const { delPromos } = require("./delpromos");
const { promos } = require("./promos");
const { sendPromos } = require("./sendpromos");

const promo = {
    promos,
    sendPromos,
    delPromos,
};

module.exports = { promo };