const core = require('../../../core.js');
const guilds_config = core.bot.discord.guild;

class EmojieCommand {

    static call(data) {
        let guild_config = guilds_config[data.channel.guild.id];
        if (!guild_config)
            return;

        let value = data.config.value;
        guild_config.config.emojie.mode = value;
        guild_config.update();
    }

}

module.exports = EmojieCommand;