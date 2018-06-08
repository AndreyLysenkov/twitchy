class RebootCommand {

    static kill() {
        process.exit(1);
    }

    static call(data) {
        data.channel.send(data.config.reply.format(data)).then(() => {
            RebootCommand.kill();
        });
    }

}

module.exports = RebootCommand;