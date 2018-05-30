const config = require('../../config/bot.json').twitch.register;

class Register {

    subscribe(channel, receiver) {
        Register.receiver.push({
            "channel": channel,
            "receiver": receiver
        });
        Register.add(channel);
    }

    add(channel) {
        let id = channel;
        if (!id)
            id = config.statusChannel;
        if (Register.channel.indexOf(channel) < 0)
            Register.channel.push(channel);
    }

    send(channel, message) {
        this.receiver.forEach((info) => {
            if (info.channel === channel)
                info.receiver.receive(message);
        });
    }

}

Register.receiver = [];
Register.channel = [];

module.exports = Register;