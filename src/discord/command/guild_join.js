const moment = require('moment');

const core = require('../../core.js');

class GuildJoinListener {

    constructor(client, config) {
        this.client = client;
        this.config = config;
    }


    call(self, guild) {
        if (!this.broadcaster)
            this.broadcaster = core.app.bot.discord.broadcaster;

        let guildId = guild.id;
        let time = moment();
        self.broadcaster.send(
            self.config.channel,
            {
                event: self.config.event,
                entry: {
                    event: self.config.event,
                    guildId: guildId,
                    time: time
                },
                time: time,
                guildId: guildId,
            }
        );
    }

}

module.exports = GuildJoinListener;