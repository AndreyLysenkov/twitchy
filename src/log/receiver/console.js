const core = require('../../core.js');

const chalk = require('chalk');

class ConsoleReceiver {

    constructor(config) {
        if (!config)
            config = core.config.main.log.receiver.console;
        this.config = config;
    }

    get_receiver(log) {
        let receiver = {};
        switch (log.level) {
            case 'verbose':
            case 'debug':
                receiver = console.debug;
                break;
            case 'warn':
                receiver = console.warn;
                break;
            case 'error':
                receiver = console.error;
                break;
            case 'main':
            default:
                receiver = console.log;
        }
        return receiver;
    }

    get_style(log) {
        return ConsoleReceiver.get_style(this.config.style[log.level]);
    }

    error_stringify(log, spaces) {
        return JSON.stringify(log.error, null, spaces);
    }

    error_toString(log) {
        return log.error.toString();
    }

    time_format(log) {
        return log.time.format(this.config.time_format);
    }

    hide_tokens(content) {
        let discord_token = core.config.token.discord;
        let twitch_token = core.config.token.twitch.password;

        return content
            .replace(discord_token, core.config.lang.log.token.discord)
            .replace(twitch_token, core.config.lang.log.token.twitch);
    }

    make_lines(content, template, log) {
        let lines = content.split(template.split);
        for (let i = 0; i < lines.length; i++) {
            if (i < template.skip)
                continue;
            log.line = lines[i];
            lines[i] = template.line.format(log);
        }
        return lines;
    }

    receive(log) {
        let template = this.config.template.main;

        if (log.error) {
            template = this.config.template.error;
            log.error_formatted = {
                toString: this.error_toString(log),
                stringify: this.error_stringify(log, template.spaces)
            };
        }

        log.time_formatted = this.time_format(log);

        let receiver = this.get_receiver(log);
        let style = this.get_style(log);

        let content = template.content.format(log);
        content = this.hide_tokens(content);

        let lines = this.make_lines(content, template, log);

        this.send(lines, receiver, style);

        if (log.error && this.config.template.error.raw.enabled)
            console.error(
                this.config.template.error.raw.message.format(log),
                log.error
            );
    }

    send(lines, receiver, style) {
        lines.forEach((line) => receiver(style(line)));
    }

    static get_style(config) {
        let style = chalk;
        config.forEach((conf) => {
            style = style[conf];
        });
        return style;
    }

}

module.exports = ConsoleReceiver;