const core = require('../../core.js');

class HelpCommand {

    static call(data) {
        let config = data.config;
        let list = config.command;
        let commands = [];
        list.forEach((command) => {
            commands.push(config.template.command.format({
                command: command,
                data: data
            }));
        });
        let commands_lines = list.join(config.template.join.format(data));
        data.channel.send(config.template.reply.format({
            data: data,
            commands: commands_lines
        }));
    }

}

module.exports = HelpCommand;