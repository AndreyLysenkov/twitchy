const TwitchBroadcaster = require('../twitch/broadcaster.js');
const DiscordChannel = require('./channel.js');

const core = require('../core.js');
const config = core.config.main.discord.broadcaster;

class DiscordTwitchBroadcaster extends TwitchBroadcaster {

    constructor(twitch, discord) {
        super(twitch);
        this.discord = discord;
        this.send = this.send_data;
        this.subscribe = this.addDiscordChannel;

        this.message_stringify = require('../stringify/core.js');
        this.message_emojie = this.discord.emojie.replace;
    }

    parse_entry(entry) {
        if (entry.content)
            entry.content = this.message_emojie(entry.content);

        let result = this.message_stringify(entry);
        return result;
    }

    limit_message(content) {
        if (content.length <= config.limit)
            return [content];

        // TODO?;
        let result = [];
        for (let i = 0; i < content.length; i += config.limit) {
            result.push(content.substring(i, i + config.limit));
        }
        return result;
    }

    send_data(channel, entry) {
        let message = this.parse_entry(entry);
        let lines = this.limit_message(message);
        let self = this;
        lines.forEach((line) => {
            self.send_entry(
                channel,
                config.template.format({
                    line: line
                })
            );
        });
    }

    addDiscordChannel(twitch_channel, id) {
        let discord_channel = new DiscordChannel(this.discord.client, id.guild, id.channel);
        this.add_receiver(twitch_channel, discord_channel);
    }

}

module.exports = DiscordTwitchBroadcaster;