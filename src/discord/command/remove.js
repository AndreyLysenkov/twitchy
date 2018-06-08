const core = require('../../core.js');
let guilds = core.bot.discord.guild;
let broadcaster = core.bot.discord.broadcaster;

class RemoveCommand {

    static call(data) {
        if (data.args.length < 1)
            return;

        let twitch_channel = data.args[0];
        let discord_channel = (data.args.length >= 2) ?
            data.args[1]
            : data.channel.id;

        let guildId = data.guild;
        let config = guilds[guildId];

        config.channels = config.channels
            .filter((setting) => {
                return setting.discord === discord_channel
                     && setting.twitch === twitch_channel;
            });
        config.update();

        broadcaster.unsubscribe(twitch_channel, discord_channel);

        data.channel.send(data.config.reply.format(data));
    }

}

module.exports = RemoveCommand;