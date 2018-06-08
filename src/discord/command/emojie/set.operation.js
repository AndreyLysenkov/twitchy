const core = require('../../../core.js');
const guilds_config = core.bot.discord.guild;

class EmojieListOperationSubcommand {

    static add(data, config, emojie) {
        config.emojie.list.push(emojie);
        config.update();

        return data.config.reply.format(data);
    }

    static remove(data, config, emojie) {
        let index = config.config.emojie.list.indexOf(emojie);
        if (index < 0)
            return data.config.failed.format(data);

        config.config.emojie.list.splice(index, 1);
        config.update();

        return data.config.reply.format(data);
    }

    static call(data) {
        let guild_config = guilds_config[data.channel.guild.id];
        if (!guild_config)
            return;

        let emojie = data.args[0];

        if (data.config.isAdd)
            data.channel.send(
                EmojieListOperationSubcommand.add(data, guild_config, emojie));
        else
            data.channel.send(
                EmojieListOperationSubcommand.remove(data, guild_config, emojie));
    }

}

module.exports = EmojieListOperationSubcommand;