const moment = require('moment');

const twitchy = require('./core/bot.js');
const config = require('./../config/main.json');

let bot = new twitchy(require(`./../config/${config.bot.config}.json`));

const token = require(`./../config/${config.bot.token}.json`);

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.replace(token.discord, '---TOKEN---')}`);
};

bot.addLogReceiver(log, config.log.console.level);

bot.config.token = token;

/// tmp zone
bot.login().then(() => {
    require('./core/after_login.js');
});

module.exports = bot;