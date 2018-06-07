class AboutCommand {

    static call(data) {
        data.channel.reply(data.config.reply);
    }

}


module.exports = AboutCommand;