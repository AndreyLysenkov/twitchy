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

        this.twitch.on("message",
            (channel, userstate, message, self) =>
                this.event(this,
                    {
                        "channel": channel,
                        "userstate": userstate,
                        "message": message,
                        "self": self
                    })
        );
    }

    start() {
        this.twitch.connect();
    }

    event(chat, message) {
        // tmp; TODO;
        chat.send(JSON.stringify(message, null, 4));
    }

    send(message) {
        this.receiver.forEach(x => x.receive(message));
    }

    subscribe(receiver) {
        this.receiver.push(receiver);
    }

}

module.exports = Chat;