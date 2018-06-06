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
            core.warn(
                core.config.main.log.module,
                `can't find channel ${this.channelId} in guild ${this.guildId}`,
                e);
        }
    }

    receive(message) {
        if (!this.channel)
            this.fetch();
        this.channel.send(message);
    }

}

module.exports = DiscordChannel;