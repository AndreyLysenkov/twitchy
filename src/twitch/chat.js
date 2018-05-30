const twitch = require('twitch-webchat');

class Chat {

    constructor(channel) {
        this.channel = channel;
        this.receiver = [];
        this.twitch = {};
    }

    start() {
        this.twitch = twitch.start(this.channel, 
            (error, message) => this.event(this, error, message));
    }

    event(chat, error, message) {
        if (error) {
            throw error;
        }

        switch (message.type) {
            case 'chat':
                // TODO;
                break;
            case 'system':
                // TODO;
                break;
            case 'tick':
                // TODO;
                break;
            case 'debug':
                // TODO;
                break;
            default:
            // TODO;
        }

        // tmp;
        chat.send(JSON.stringify(message));
    }

    send(message) {
        this.receiver.forEach(x => x.receive(message));
    }

    subscribe(receiver) {
        this.receiver.push(receiver);
    }

}

module.exports = Chat;