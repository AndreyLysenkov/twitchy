const discord = require('discord.js');

const LogReceiver = require('./logReceiver.js');

class Bot {

    constructor(config, method, level) {
        this.config = config;
        this.logReceiver = [];
        this.logMessage = this.config.log.message;
        this.createDiscordClient();
    }

    addLogReceiver(method, level) {
        this.logReceiver.push(new LogReceiver(method, level));
    }

    log(message, level) {
        if (!level) {
            level = this.config.log.level.basic;
        }
        this.logReceiver.forEach(x => x.log(message, level));
    }

    registerDiscordClientLog(name) {
        this.client.on(name, e => {
            this.log(e, this.config.log.level[name]);
        });
    }

    createDiscordClient() {
        this.client = new discord.Client();

        this.registerDiscordClientLog('debug');
        this.registerDiscordClientLog('warn');
        this.registerDiscordClientLog('error');
    }

    login() {
        return this.client.login(this.config.token.discord)
            .then(() => {
                this.log(this.logMessage.login.discord);
            });
    }

}

module.exports = Bot;