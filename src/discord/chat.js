const core = require('../core.js');
const config = core.config.main.discord.chat;

class Chat {

    constructor(client, guildId, channelId) {
        this.client = client;
        this.guildId = guildId;
        this.channelId = channelId;
        this.channel = this.client.guilds.get(guildId).channels.get(channelId);
        this.message_stringify = require('../stringify/core.js');
        this.message_emojie = core.app.bot.discord.emojie.replace;
    }


    limit_content(content) {
        if (content.length <= config.limit)
            return [ content ];

        // TODO?;
        let result = [];
        for (let i = 0; i < content.length; i += config.limit) {
            result.push(content.substring(i, i + config.limit));
        }
        return result;
    }

    receive(entry) {
        entry.content = this.message_emojie(entry.content);

        let content = this.message_stringify(entry);
        let lines = this.limit_content(content);
        lines.forEach((line) => this.channel.send(
            config.template.format({
                "line": line
            })));
    }

}

module.exports = Chat;