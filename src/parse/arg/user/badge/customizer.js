// is this gonna be more redicilous then it is?;
const core = require('../../../../core.js');
const config = core.config.main.parser.badge;
config.private = core.config.private.badge;

class BadgeCustomizer {

    static load() {
        let guildIds = config.private.guild;
        let client = core.app.bot.discord.client;

        guildIds.forEach((guildId) => {
            let guild = client.guilds.get(guildId);
            let emojis = guild.emojis;

            BadgeCustomizer.load_parse(emojis);
        });
    }

    static load_parse(emojis) {
        emojis.forEach((emojie) => {
            BadgeCustomizer.load_parse_emojie(emojie);
        });
    }

    static load_parse_emojie(emojie) {
        let name = emojie.name;
        let separated = name.split(config.separator);

        let channel = BadgeCustomizer.load_parse_emojie_channel(separated);
        if (!BadgeCustomizer.badge[channel])
            BadgeCustomizer.badge[channel] = {};
        let type = BadgeCustomizer.load_parse_emojie_type(separated);
        let value = BadgeCustomizer.load_parse_emojie_value(separated);
        let content = BadgeCustomizer.load_parse_emojie_content(emojie);


        if (!BadgeCustomizer.badge[channel])
            BadgeCustomizer.badge[channel] = {};
        let channel_badge = BadgeCustomizer.badge[channel];

        if (!channel_badge[type])
            channel_badge[type] = {};
        let type_badge = channel_badge[type];

        type_badge[value] = content;
    }

    static load_parse_emojie_content(emojie) {
        return emojie.toString();
    }

    static load_parse_emojie_type(separated) {
        return separated[separated.length - 2];
    }

    static load_parse_emojie_value(separated) {
        return separated[separated.length - 1];
    }

    static load_parse_emojie_channel(separated) {
        let channel = '';
        for (let i = 0; i < separated.length - 2; i++) {
            channel += `${config.separator}${separated[i]}`;
        }
        channel = channel.substring(config.separator.length);
        if (channel === config.default)
            return config.default;
        return `#${channel}`;
    }

    static getBadge(channel, type, value) {
        let channel_badges = BadgeCustomizer.badge[channel];
        if (!channel_badges && channel == config.default)
            return null;
        if (!channel_badges)
            return BadgeCustomizer.getBadge(config.default, type, value);

        let type_badge = channel_badges[type];
        if (!type_badge && channel == config.default)
            return null;
        if (!type_badge)
            return BadgeCustomizer.getBadge(config.default, type, value);

        let badge = type_badge[value];
        if (!badge && channel != config.default)
            return BadgeCustomizer.getBadge(config.default, value);
        return badge;
    }

}

BadgeCustomizer.badge = { };

module.exports = BadgeCustomizer;