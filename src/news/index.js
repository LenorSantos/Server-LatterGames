const { delNews } = require('./delNews');
const { News } = require('./news');
const { setNews } = require('./setNews');

const news = {
    News,
    delNews,
    setNews
};

module.exports = { news };