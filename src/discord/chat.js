class Chat {

    constructor(client, guild, chat) {
        this.client = client;
        this.channel = this.client.guilds.get(guild).channels.get(chat);
    }

    send(chat, message) {
        chat.channel.send(message);
    }

}

module.exports = Chat;