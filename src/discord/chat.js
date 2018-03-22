class Chat {

    constructor(client, guildId, channelId) {
        this.client = client;
        this.guildId = guildId;
        this.channelId = channelId;
        this.channel = this.client.guilds.get(guildId).channels.get(channelId);
    }

    send(message) {
        this.obj.channel.send(message);
    }

}

module.exports = Chat;