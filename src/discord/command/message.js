const core = require('../../core.js');

class MessageListener {

    constructor(client, config) {
        this.client = client;
        this.config = config;
    }

    call(message) {
        try {
            let content = message.content;
            let channel = message.channel;
            let author = message.member;

            if (!content
                || !content.startsWith(this.config.prefix)
                || !channel.guild
                || !author.permissions.has('ADMINISTRATOR'))
                return;

            let args = content.split(this.config.split);
            // TODO;

        } catch (e) {
            core.warn(`smth went wrong when reading command`, e);
        }
    }

}

module.exports = MessageListener;