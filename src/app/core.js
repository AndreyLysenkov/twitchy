const core = require('../core.js');

const DiscordBot = require('../discord/bot.js');
const TwitchBot = require('../twitch/bot.js');

class App {

    static start() {
        App.bot.discord.start();

    }

    static onDiscordLogin() {
        const GuildConfig = require('../discord/guild_config.js');
        const DiscordBroadcaster = require('../discord/broadcaster.js');

        let discord_bot = App.bot.discord;
        let twitch_bot = App.bot.twitch;

        let discord_broadcaster = new DiscordBroadcaster(twitch_bot, discord_bot);
        twitch_bot.subscribe(discord_broadcaster);

        let guilds = discord_bot.client.guilds;

        guilds.forEach((guild) => {
            let guild_config = new GuildConfig(guild.id);
            if (!guild_config.config || !guild_config.config.channels)
                return;

            guild_config.config.channels.forEach((config) => {
                discord_broadcaster.subscribe(config.twitch, {
                    guild: guild.id,
                    channel: config.discord
                });
            });

            discord_bot.emojie.fetch(guild_config);
        });

        twitch_bot.start();
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
    discord : new DiscordBot(core.config.token.discord),
    twitch: new TwitchBot(core.config.token.twitch)
};

App.bot.discord.client.on('ready', App.onDiscordLogin);

App.bot.discord.emojie = require('../discord/emojie.js');

module.exports = App;