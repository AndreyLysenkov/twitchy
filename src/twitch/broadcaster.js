class TwitchBroadcaster {

    constructor(twitch) {
        this.receiver = {};
        this.twitch = twitch;
        this.subscribe = this.add_receiver;
        this.send = this.send_entry;
    }

    add_receiver(channel, receiver) {
        if (!channel.startsWith('#'))
            channel = `#${channel}`;

        if (!this.receiver[channel])
            this.receiver[channel] = [];

        this.receiver[channel].push(receiver);
        this.twitch.addChannel(channel);
    }

    send_entry(channel, entry) {
        this.receiver[channel].forEach(
            (receiver) => receiver.receive(entry));
    }

}

module.exports = TwitchBroadcaster;