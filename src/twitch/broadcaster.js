class TwitchBroadcaster {

    constructor(twitch) {
        this.receiver = {};
        this.twitch = twitch;
        this.subscribe = this.add_receiver;
        this.send = this.send_entry;
    }

    addChannel(channel) {
        if (!channel.startsWith('#'))
            channel = `#${channel}`;
        if (!this.receiver[channel])
            this.receiver[channel] = [];
    }

    add_receiver(channel, receiver) {
        if (!channel.startsWith('#'))
            channel = `#${channel}`;

        this.addChannel(channel);

        this.receiver[channel].push(receiver);
        this.twitch.addChannel(channel);
    }

    send_entry(channel, entry) {
        this.receiver[channel].forEach(
            (receiver) => receiver.receive(entry));
    }

}

module.exports = TwitchBroadcaster;