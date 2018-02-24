const moment = require('moment');

const twitchy = require('./core/bot.js');
const config = require('../config/main.json');

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

let bot = new twitchy(require(`../config/${config.bot.config}.json`));

const token = require(`../config/${config.bot.token}.json`);

bot.addLogReceiver(log, config.log.console.level);

bot.config.token = token;

bot.login();