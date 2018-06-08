const core = require('../../core.js');

class SettingCommand {

    static call(data) {
        const guilds_config = core.app.bot.discord.guild;
        let guildId = data.channel.guild.id;
        let config = guilds_config[guildId];
        if (!config)
            return;

        data.guild_config = JSON.stringify(config.config, null, data.config.json_option);
        data.channel.send(data.config.reply.format(data));
    }

}

module.exports = SettingCommand;