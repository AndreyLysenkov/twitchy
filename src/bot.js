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
    const twitch = require('./twitch/chat.js');
    let discord_channel = require('./discord/chat.js');

    //service
    let channel0 = new discord_channel(bot.client, `338714704002285568`, `402156171194269706`);
    twitch.subscribe('#status#', channel0);

    /// me
    let channel = new discord_channel(bot.client, `338714704002285568`, `451538129409802270`);
    twitch.subscribe('allan_walpy', channel);

    /// jack-test
    let channel2 = new discord_channel(bot.client, `338714704002285568`, `353195227558838275`);
    twitch.subscribe('jackshepardtwitch', channel2);

    twitch.connect();
});

module.exports = bot;