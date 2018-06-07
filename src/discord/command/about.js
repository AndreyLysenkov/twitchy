const info = require('../../../package.json');

class AboutCommand {

    static call(data) {
        data.channel.send(data.config.reply.format(info));
    }

}

module.exports = AboutCommand;