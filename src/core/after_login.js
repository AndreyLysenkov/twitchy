const GuildConfig = require('./guild_config.js');

const discord_channel = require('../discord/chat.js');
const bot = require('../bot.js');
const client = bot.client;

bot.twitch = require('../twitch/chat.js');

let guilds = client.guilds;

guilds.forEach((guild) => {
    let guild_config = new GuildConfig(guild.id);
    if (!guild_config.config || !guild_config.config.channels)
        return;
    guild_config.config.channels.forEach((config) => {
        let channel = new discord_channel(bot.client, guild.id, config.discord);
        bot.twitch.subscribe(config.twitch, channel); 
    });
});

bot.twitch.connect();