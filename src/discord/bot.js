const core = require('../core.js');

const discord = require('discord.js');

class DiscordBot {

    constructor(token) {
        this.config = core.config.main.discord;
        this.token = token;
        this.client = new discord.Client();

        this.set_logger();
    }

    set_logger() {
        let self = this;
        this.config.log.list.forEach((e) => {
            self.client.on(e.event, (message) => DiscordBot.log(e.level, message));
        });
    }

    static log(level, message) {
        core.logger.send(level, this.config.log.module, message);
    }

    start() {
        return this.client.login(this.token);
    }

    stop() {
        // TODO;
    }

}

module.exports = DiscordBot;