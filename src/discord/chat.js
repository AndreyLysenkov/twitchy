class Chat {

    constructor(client, guildId, channelId) {
        this.client = client;
        this.guildId = guildId;
        this.channelId = channelId;
        this.channel = this.client.guilds.get(guildId).channels.get(channelId);
        this.message_stringify = require('../parse/stringify.js');
    }

    receive(message) {
        let content = this.message_stringify(message);
        this.channel.send(content);
    }

}

module.exports = Chat;