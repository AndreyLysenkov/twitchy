const core = require('../core.js');

const discord = require('discord.js');

class DiscordBot {

    constructor(token) {
        this.token = token;
        this.client = new discord.Client();
    }

    start() {
        return this.client.login(this.token);
    }

    stop() {
        // TODO;
    }

}

module.exports = DiscordBot;