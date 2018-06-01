class TwitchBot {

    constructor() {
        // TODO;
        this.chat = require('./chat.js');
    }

    start() {
        // TODO;
        this.chat.connect();
    }

    stop() {
        // TODO;
    }

    subscribe(twitch_channel, discord_channel) {
        // TODO;
        this.chat.subscribe(twitch_channel, discord_channel);
    }

}

module.exports = TwitchBot;