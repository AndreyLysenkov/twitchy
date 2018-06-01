const core = require('../core.js');

const DiscordBot = require('../discord/bot.js');
const TwitchBot = require('../twitch/bot.js');

class App {

    static start() {
        App.bot.discord.start();
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

module.exports = App;