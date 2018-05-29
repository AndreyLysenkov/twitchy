const moment = require('moment');

const twitchy = require('../core/bot.js');
const config = require('../../config/main.json');

let bot = new twitchy(require(`../../config/${config.bot.config}.json`));

const token = require(`../../config/${config.bot.token}.json`);

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.replace(token.discord, '---TOKEN---')}`);
};

bot.addLogReceiver(log, config.log.console.level);

bot.config.token = token;

/// tmp zone
/// 338714704002285568 - guild
/// 402156171194269706 - channel
bot.login().then(() => {
    const twitch = require('../twitch/chat.js');
    let discord_channel = require('../discord/chat.js');

    /// me
    let channel = new discord_channel(bot.client, `338714704002285568`, `402156171194269706`);
    let chat = new twitch('allan_walpy', bot.config.twitch, token.twitch, log, []);
    chat.subscribe(channel, channel.send);
    chat.activate();

    /// vultr jack
    let channel2 = new discord_channel(bot.client, `338714704002285568`, `353195227558838275`);
    let chat2 = new twitch('jackshepardtwitch', bot.config.twitch, token.twitch, log, []);
    chat2.subscribe(channel2, channel2.send);
    chat2.activate();
});

module.exports = bot;