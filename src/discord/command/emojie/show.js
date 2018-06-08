const core = require('../../../core.js');
const guilds_config = core.app.bot.discord.guild;

class EmojiShowSubcommand {

    static call(data) {
        let guild_config = guilds_config[data.channel.guild.id];
        if (!guild_config)
            return;

        data.emojie_setting = JSON.stringify(guild_config.config.emojie, null, data.config.json_option);
        data.channel.send(data.config.reply.format(data));
    }

}

module.exports = EmojiShowSubcommand;