const core = require('../../core.js');
const owners = core.config.private.owners;

class RebootCommand {

    static kill() {
        process.exit(0);
    }

    static call(data) {
        let authorId = data.message.author.id;
        if (!owners.includes(authorId))
            return;
        data.channel.send(data.config.reply.format(data)).then(() => {
            RebootCommand.kill();
        });
    }

}

module.exports = RebootCommand;