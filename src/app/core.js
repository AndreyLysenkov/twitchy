const core = require('../core.js');

const DiscordBot = require('../discord/bot.js');
const TwitchBot = require('../twitch/bot.js');

class App {

    static start() {
        App.bot.discord.start();
        
    }

    static onDiscordLogin() {
        const GuildConfig = require('./guild_config.js');
        const DiscordChannel = require('../discord/chat.js');

        let discord_client = App.bot.discord.client;
        let guilds = discord_client.guilds;

        guilds.forEach((guild) => {
            let guild_config = new GuildConfig(guild.id);
            if (!guild_config.config || !guild_config.config.channels)
                return;
                
            guild_config.config.channels.forEach((config) => {
                let channel = new DiscordChannel(discord_client, guild.id, config.discord);
                App.bot.twitch.subscribe(config.twitch, channel);
            });
        });

        App.bot.twitch.start();
    }

    static stop() {
        App.bot.discord.stop();
        App.bot.twitch.stop();
    }

    static restart() {
        App.stop();
        App.start();
    }

}

App.bot = {
    "discord" : new DiscordBot(core.config.token.discord),
    "twitch": new TwitchBot(core.config.token.twitch)
};

App.bot.discord.client.on("ready", App.onDiscordLogin);

module.exports = App;