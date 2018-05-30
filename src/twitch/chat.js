const twitch = require('tmi.js').client;

class Chat {

    constructor(channel, config, token, log) {
        this.channel = channel;
        this.config = config;
        this.log = log;
        this.receiver = [];

        if (!this.config)
            this.config = {};
        if (!this.config.tmi)
            this.config.tmi = {};
        if (token)
            this.config.tmi.identity = token;

        //this.config.tmi.logger = this.log;
        this.config.channel = [this.channel];

        this.twitch = new twitch(this.config.tmi);

        this.config.event.forEach((e) => {
            if (e.enable)
                this.twitch.on(e.name,
                    (arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
                        if (this.channel === 'allan_walpy' || arg1 === `#${this.channel}`)
                            this.event(this,
                                this.makeRequestObj(e.name, [arg1, arg2, arg3, arg4, arg5, arg6, arg7]));
                    }
                );
        });
    }

    makeRequestObj(event, args) {
        let result = {};
        result.event = event;
        for (let i = 0; i < args.length; i++) {
            if (args[i])
                result[`arg${i}`] = args[i];
        }
        return result;
    }

    start() {
        this.twitch.connect();
    }

    event(chat, message) {
        // tmp; TODO;
        chat.send(JSON.stringify(message, null, 4));
    }

    send(message) {
        this.receiver.forEach(x => x.receive(`\`\`\`${message}\`\`\``));
    }

    subscribe(receiver) {
        this.receiver.push(receiver);
    }

}

module.exports = Chat;