const twitch = require('tmi.js');
const moment = require('moment');

const core = require('../core.js');
const config = core.config.main.twitch;

class TwitchBot {

    constructor(token) {
        this.token = token;
        this.broadcaster = [];
        this.channels = [];
    }

    set_client_config() {
        if (!config.client)
            config.client = { };
        this.set_client_config_logger();
        this.set_client_config_token();
        this.set_client_config_channels();
    }

    set_client_config_logger() {
        config.client.logger = { };
        config.log.list.forEach((log) => {
            config.client.logger[log.event] = (message) => core.logger.core.send(
                log.level,
                config.log.module,
                message
            );
        });
    }

    set_client_config_token() {
        config.client.identity = this.token;
    }

    set_client_config_channels() {
        let channels = [];
        config.channels.forEach((channel) => {
            this.broadcaster.forEach((broadcaster) => {
                broadcaster.addChannel(channel);
            });
            if (channel !== config.status)
                channels.push(channel);
        });
        config.client.channels = channels;
    }

    set_client_event() {
        let self = this;
        config.event.forEach((e) => {
            if (!e.enable)
                return;
            self.client.on(e.name, (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) => {
                self.event(e.name, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            });
        });
    }

    set_client() {
        this.set_client_config();
        this.client = new twitch.client(config.client);
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
        return config.channels.includes(channel);
    }

    isHaveChannel(channel) {
        return this.channels.includes(channel);
    }

    formatChannel(channel) {
        if (!channel.startsWith('#'))
            return `#${channel}`;
        return channel;
    }

    addChannel(channel) {
        channel = this.formatChannel(channel);

        if (!this.isValidChannel(channel)
            || this.isHaveChannel(channel))
            return;

        if (channel != config.status)
            this.channels.push(channel);
    }

    subscribe(broadcaster) {
        this.broadcaster.push(broadcaster);
    }

    getChannel(entry) {
        let channel = entry.channel;
        if (!channel || !this.isValidChannel(channel))
            channel = config.status;
        return channel;
    }

    event_parse(data) {
        let EntryParser = require('../parse/entry.js');
        let entry = new EntryParser(data);
        entry.parse();
        return entry;
    }

    event(name) {
        let data = {
            event: name,
            argument: arguments,
            time: moment()
        };
        let entry = this.event_parse(data);
        let channel = this.getChannel(entry);
        this.send(channel, entry);
    }

    send(channel, message) {
        this.broadcaster.forEach(
            (broadcaster) => broadcaster.send(channel, message));
    }

}

module.exports = TwitchBot;