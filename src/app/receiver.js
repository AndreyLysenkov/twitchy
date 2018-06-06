class Receiver {

    constructor() {
        this.receiver = {};
        this.parse = (message) => message;
    }

    add_receiver(channel, receiver) {
        if (!this.receiver[channel])
            this.receiver[channel] = [];
        this.receiver[channel].push(receiver);
    }

    subscribe(channel, receiver) {
        if (!channel.startsWith('#'))
            channel = `#${channel}`;
        this.add_receiver(channel, receiver);
    }

    send(channel, message) {
        let parsed_message = this.parse(message);
        this.receiver[channel].forEach(
            (receiver) => receiver.receive(parsed_message));
    }

}

module.exports = Receiver;