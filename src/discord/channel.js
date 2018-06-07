const core = require('../core.js');

class DiscordChannel {

    constructor(client, guildId, channelId) {
        this.client = client;
        this.guildId = guildId;
        this.channelId = channelId;
    }

    fetch() {
        try {
            this.channel = this.client
                .guilds.get(this.guildId)
                .channels.get(this.channelId);
        } catch (e) {
            core.warn(`can't find channel ${this.channelId} in guild ${this.guildId}`, e);
            this.channel = {};
        }
    }

    receive(message) {
        if (!this.channel)
            this.fetch();

        try {
            this.channel.send(message);
        } catch (e) {
            core.warn(`failed to send to channel ${this.channelId} in guild ${this.guildId}`, e);
        }
    }

}

module.exports = DiscordChannel;