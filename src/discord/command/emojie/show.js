const core = require('../../../core.js');
const guilds_config = core.app.bot.discord.guild;

class EmojiShowSubcommand {

    static getEmojis(guild) {
        return guild.emojis;
    }

    static getList(list, config_list, isInList) {
        let result = [];
        list.forEach((emojie) => {
            let isIncludes = config_list.includes(emojie.id);
            if ((isInList && isIncludes)
                || (!isInList && !isIncludes))
                result.push(emojie);
        });
        return result;
    }

    static toSting(config, list) {
        if (list.length === 0)
            return config.none;
        list.forEach(emojie => emojie.toString());
        return list.join(config.separator);
    }

    static call(data) {
        let guild_config = guilds_config[data.channel.guild.id];
        if (!guild_config)
            return;

        data.emojie_setting = JSON.stringify(guild_config.config.emojie, null, data.config.json_option);
        let all_emojis = EmojiShowSubcommand.getEmojis(data.channel.guild);
        data.emojie_list_in = EmojiShowSubcommand.toSting(
            data.config,
            EmojiShowSubcommand.getList(
                all_emojis,
                guild_config.config.emojie.list,
                true
            ));
        data.emojie_list_out = EmojiShowSubcommand.toSting(
            data.config,
            EmojiShowSubcommand.getList(
                all_emojis,
                guild_config.config.emojie.list,
                false
            ));

        data.channel.send(data.config.reply.format(data));
    }

}

module.exports = EmojiShowSubcommand;