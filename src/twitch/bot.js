const core = require('../core.js');
const twitch = require('tmi.js');

class TwitchBot {

    constructor(token) {
        this.token = token;
        this.config = core.config.main.twitch;
        this.channels = [];
        this.receiver = {};
    }

    set_client_config() {
        if (!this.config.client)
            this.config.client = { };
        this.set_client_config_logger();
        this.set_client_config_token();
        this.set_client_config_channels();
    }

    set_client_config_logger() {
        this.config.client.logger = { };
        let self = this;
        this.config.log.list.forEach((log) => {
            self.config.client.logger[log.event] = (message) => core.logger.core.send(
                log.level,
                self.config.log.module,
                message
            );
        });
    }

    set_client_config_token() {
        this.config.client.identity = this.token;
    }

    set_client_config_channels() {
        let channels = [];
        this.channels.forEach((channel) => {
            if (channel != this.config.status)
                channels.push(channel);
        });
        this.config.client.channels = channels;
    }

    set_client_event() {
        let self = this;
        this.config.event.forEach((e) => {
            if (!e.enable)
                return;
            self.client.on(e.name, (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) => {
                self.event(e.name, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            });
        });
    }

    set_client() {
        this.set_client_config();
        this.client = new twitch.client(this.config.client);
        this.set_client_event();
    }

    start() {
        this.set_client();
        this.client.connect();
    }

    stop() {
        // TODO;
    }

    isValidChannel(channel) {
        return this.config.channels.indexOf(channel) >= 0;
    }

    add_channel(channel) {
        if (this.isValidChannel(channel)
            && this.receiver[channel])
            return;
        this.receiver[channel] = [];
        this.channels.push(channel);
        
    }

    add_receiver(channel, receiver) {
        this.receiver[channel].push(receiver);
    }

    subscribe(channel, receiver) {
        if (!channel.startsWith('#'))
            channel = `#${channel}`;
        this.add_channel(channel);
        this.add_receiver(channel, receiver);
    }

    event_tmp(data) {
        // TODO; tmp zone; tmp function;
        let result = "\n---\n";
        
        let MessageParser = require('../parse/message.js');
        let parser = new MessageParser(data);
        parser.parse();
        
        // add badges;
        if (parser.user && parser.user.badge) {
            result += "\nbadges: [ ";
            parser.user.badge.forEach((badge) => {
                result += `, ${badge}`;
            });
            result += " ];\n";
        }

        return result;
    }

    event(name) {
        let data = {
            event: name,
            argument: arguments
        };
        let channel = data.argument[1];
        if (!channel || !this.isValidChannel(channel))
            channel = this.config.status;

        let tmp_addition = this.event_tmp(data);

        // todo;
        this.send(channel, `adds:${tmp_addition}\n\`\`\`json\n${JSON.stringify(data, null, 4)}\n\`\`\``);
    }

    send(channel, message) {
        this.receiver[channel].forEach(
            (receiver) => receiver.receive(message));
    }

}

module.exports = TwitchBot;