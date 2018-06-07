class AboutCommand {

    static call(data) {
        data.channel.send(data.config.reply);
    }

}

module.exports = AboutCommand;