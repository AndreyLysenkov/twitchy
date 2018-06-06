// is this gonna be more redicilous then it is?;
const core = require('../../../../../core.js');
const config = core.config.main.parser.badge.subscriber;
config.private = core.config.private.badge.subscriber;

class SubscriberBadgeCustomizer {

    static load() {
        let guildId = config.private.guild;
        let client = core.app.bot.discord.client;
        let guild = client.guilds.get(guildId);
        let emojis = guild.emojis;

        SubscriberBadgeCustomizer.load_parse(emojis);
    }

    static load_parse(emojis) {
        emojis.forEach((emojie) => {
            SubscriberBadgeCustomizer.load_parse_emojie(emojie);
        });
    }

    static load_parse_emojie(emojie) {
        let name = emojie.name;
        let separated = name.split(config.separator);

        let channel = SubscriberBadgeCustomizer.load_parse_emojie_channel(separated);
        if (!SubscriberBadgeCustomizer.badge[channel])
            SubscriberBadgeCustomizer.badge[channel] = {};
        let value = SubscriberBadgeCustomizer.load_parse_emojie_value(separated);
        let content = SubscriberBadgeCustomizer.load_parse_emojie_content(emojie);

        SubscriberBadgeCustomizer.badge[channel][value] = content;
    }

    static load_parse_emojie_content(emojie) {
        return emojie.toString();
    }

    static load_parse_emojie_value(separated) {
        return separated[separated.length - 1];
    }

    static load_parse_emojie_channel(separated) {
        let channel = "";
        for (let i = 0; i < separated.length - 1; i++) {
            channel += `${config.separator}${separated[i]}`;
        }
        channel = channel.substring(config.separator.length);
        if (channel === config.default)
            return config.default;
        return `#${channel}`;
    }

    static getBadge(channel, value) {
        let channel_badges = SubscriberBadgeCustomizer.badge[channel];
        if (!channel_badges && channel == config.default)
            return null;
        if (!channel_badges)
            return SubscriberBadgeCustomizer.getBadge(config.default, value);

        let badge = channel_badges[value];
        if (!badge && channel != config.default)
            return SubscriberBadgeCustomizer.getBadge(config.default, value);
        return badge;
    }

}

SubscriberBadgeCustomizer.badge = { };

module.exports = SubscriberBadgeCustomizer;