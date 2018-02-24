const discord = require('discord.js');

const LogReceiver = require('./logReceiver.js');


class Bot {

    constructor(config, method, level) {
        this.config = config;
        this.logReceiver = [];
    }

    addLogReceiver(method, level) {
        this.logReceiver.push(new LogReceiver(method, level));
    }

    log(message, level) {
        this.logReceiver.forEach(x => x.log(message, level));
    }

    login() {
        this.client = new discord.Client();

        this.client.on('debug', e => {
            this.log(e, 0);
        });

        this.client.on('warn', e => {
            this.log(e, 5);
        });

        this.client.on('error', e => {
            this.log(e, 10);
        });

        this.client.login(this.config.token.discord)
            .then(() => {
                this.log('online', 13);
            });
    }

}

module.exports = Bot;