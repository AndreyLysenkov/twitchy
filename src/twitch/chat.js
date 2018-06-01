const twitch = require('tmi.js');

const core = require('../core.js');

const token = core.config.token.twitch;
const config = core.config.main.twitch;

class Chat {

    static subscribe(channel, receiver) {
        if (!channel)
            channel = config.status;
        if (!channel.startsWith('#'))
            channel = `#${channel}`;
        Chat.add_channel(channel);
        Chat.add_receiver(channel, receiver);
    }

    static add_channel(channel) {
        if (channel === config.status)
            return;
        if (Chat.channel.indexOf(channel) < 0)
            Chat.channel.push(channel);
    }

    static add_receiver(channel, receiver) {
        if (!Chat.receiver[channel])
            Chat.receiver[channel] = [];
        Chat.receiver[channel].push(receiver);
    }

    static send(channel, message) {
        Chat.receiver[channel].forEach(
            (receiver) => receiver.receive(message));
    }

    static connect() {
        Chat.twitch = new twitch.client(Chat.config.tmi);
        Chat.event_register();
        Chat.twitch.connect();
    }

    static event_register() {
        Chat.config.event.forEach((e) => {
            if (e.enable)
                Chat.twitch.on(e.name,
                    (arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
                        Chat.event(e.name, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
                    }
                );
        });
    }

    static event(event_name) {
        // tmp; TODO;
        let channel = arguments[1];
        if (!channel || (Chat.channel.indexOf(channel) < 0))
            channel = config.status;

        let data = {
            "event": event_name,
            "argument": arguments
        };

        let parser = require('../parse/message.js');
        let parsed = new parser(data);
        parsed.parse();

        let badges = "";
        if (parsed.user && parsed.user.badge) {
            parsed.user.badge.forEach((badge) => {
                badges += badge;
            });
        }

        Chat.send(channel,
            `badges: ${badges}\`\`\`\n${JSON.stringify(data, null, 4)}\n\`\`\``);
    }

}

Chat.receiver = {};
Chat.channel = [];
Chat.config = config;

if (!Chat.config.tmi)
    Chat.config.tmi = {};

// TODO;
Chat.config.tmi.logger = {
    info: (msg) => core.verbose('app.twitch', msg),
    warn: (msg) => core.warn('app.twitch', msg),
    error: (msg) => core.error('app.twitch', msg)
};

Chat.config.tmi.channels = Chat.channel;
if (token)
    Chat.config.tmi.identity = token;

module.exports = Chat;