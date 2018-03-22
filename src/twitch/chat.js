const twitch = require('tmi.js');
const moment = require('moment');

class Chat {

    constructor(channel, config, token, log, emojie) {
        this.channel = `#${channel}`;
        this.config = config;
        config.tmi = Chat.addToken(config.tmi, token);
        config.tmi.logger = {
            "info": (x) => { console.log(x); },
            "warn": (x) => { console.log(x); },
            "error": (x) => { console.log(x); }
        };
        this.client = new twitch.client(config.tmi);
        this.receiver = [];
        this.log = log;
        this.emojie = emojie;
        this.disconnectCount = 0;
    }

    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static addToken(tmi_option, token) {
        if (!tmi_option)
            tmi_option = {};
        if (!tmi_option.identity)
            tmi_option.identity = {};
        tmi_option.identity.password = token;
        return tmi_option;
    }

    activateEvent(event) {
        if (event.enable) {
            this.client.on(event.name, (x, y, z, k) => this[`on${Chat.capitalizeFirstLetter(event.name)}`](this, x, y, z, k));
        }
    }

    activateEvents() {
        this.config.event.forEach(x => this.activateEvent(x));
    }

    subscribe(obj, method) {
        this.receiver.push({
            "obj": obj,
            "method": method
        });
    }

    connect() {
        if (this.disconnectCount > this.config.maxReconnection) {
            this.client = new twitch.client(this.config.tmi);
        }
        return this.client.connect();
    }

    activate() {
        this.activateEvents();
        this.connectCount = 0;
        this.connect().then(() => this.log(`${this.channel} online`));
    }

    send(message) {
        this.receiver.forEach(x => x.method(x.obj, message));
    }

    sendMessage(message) {
        return this.send(
            `[${moment().format('HH:mm:ss')}] \`\`\`${message}\`\`\``);
    }

    recordOptions(name, option) {
        if (option)
            return `the: ${name} : \n${JSON.stringify(option)}\n`;
        return `the: ${name} : \nNULL\n`;
    }

    onAction(x, channel, userstate, message, self) {
        x.sendMessage(`\n-action.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('userstate', userstate)}
            ${x.recordOptions('message', message)}
            ${x.recordOptions('self', self)}`);
    }

    onBan(x, channel, username, reason) {
        x.sendMessage(`\n-ban.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('reason', reason)}`);
    }

    onChat(x, channel, userstate, message, self) {
        x.sendMessage(`\n-chat.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('userstate', userstate)}
            ${x.recordOptions('message', message)}
            ${x.recordOptions('self', self)}`);
    }

    onCheer(x, channel, userstate, message) {
        x.sendMessage(`\n-cheer.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('userstate', userstate)}
            ${x.recordOptions('message', message)}`);
    }

    onClearChat(x, channel) {
        x.sendMessage(`\n-clearchat.
            ${x.recordOptions('channel', channel)}`);
    }

    onConnected(x, adress, port) {
        x.sendMessage(`\n-connected.
            ${x.recordOptions('adress', adress)}
            ${x.recordOptions('port', port)}`);
    }

    onConnecting(x, adress, port) {
        x.sendMessage(`\n-connected.
            ${x.recordOptions('adress', adress)}
            ${x.recordOptions('port', port)}`);
    }

    onDisconnect(x, reason) {
        this.disconnectCount++;
        x.sendMessage(`\n-disconected.
            ${x.recordOptions('reason', reason)}`);
        this.connect();
    }

    onEmoteOnly(x, channel, enabled) {
        x.sendMessage(`\n-emoteonly.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('enabled', enabled)}`);
    }

    onHosted(x, channel, username, viewers) {
        x.sendMessage(`\n-hosted.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('viewers', viewers)}`);
    }

    onHosting(x, channel, target, viewers) {
        x.sendMessage(`\n-hosting.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('target', target)}
            ${x.recordOptions('viewers', viewers)}`);
    }

    onJoin(x, channel, username, self) {
        x.sendMessage(`\n-join.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('self', self)}`);
    }

    onLogon(x) {
        x.sendMessage(`\n-logon.`);
    }

    onMessage(x, channel, userstate, message, self) {
        x.sendMessage(`\n-message.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('userstate', userstate)}
            ${x.recordOptions('message', message)}
            ${x.recordOptions('self', self)}`);
    }

    onMod(x, channel, username) {
        x.sendMessage(`\n-mod.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}`);
    }

    onNotice(x, channel, msgid, message) {
        x.sendMessage(`\n-notice.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('msgid', msgid)}
            ${x.recordOptions('message', message)}`);
    }

    onPing() {
        //x.sendMessage(`\n-ping.`);
    }

    onPong(latency) {
        //log(`-pong-${latency}`);
    }

    onR9kbeta(x, channel, enabled) {
        x.sendMessage(`\n-r9kbeta.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('enabled', enabled)}`);
    }

    onReconnect(x) {
        x.sendMessage(`\n-reconnect.`);
    }

    onResub(x, channel, username, months, message) {
        x.sendMessage(`\n-resub.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('months', months)}
            ${x.recordOptions('message', message)}`);
    }

    onServerChange(x, channel) {
        x.sendMessage(`\n-serverchange.
            ${x.recordOptions('channel', channel)}`);
    }

    onSlowmode(x, channel, enabled, length) {
        x.sendMessage(`\n-slowmode.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('enabled', enabled)}
            ${x.recordOptions('length', length)}`);
    }

    onSubscribers(x, channel, enabled) {
        x.sendMessage(`\n-subscribers.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('enabled', enabled)}`);
    }

    onSubscription(x, channel, username, method) {
        x.sendMessage(`\nsubscription.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('method', method)}`);
    }

    onTimeout(x, channel, username, reason, duration) {
        x.sendMessage(`\n-timeout.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}
            ${x.recordOptions('reason', reason)}
            ${x.recordOptions('duration', duration)}`);
    }

    onUnhost(x, channel, viewers) {
        x.sendMessage(`\n-unhost.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('viewers', viewers)}`);
    }

    onUnmod(x, channel, username) {
        x.sendMessage(`\n-unmod.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('username', username)}`);
    }

    onWhisper(x, from, userstate, message, self) {
        x.sendMessage(`\n-whisper.
            ${x.recordOptions('from', from)}
            ${x.recordOptions('userstate', userstate)}
            ${x.recordOptions('message', message)}
            ${x.recordOptions('self', self)}`);
    }

    onRoomstate(x, channel, state) {
        x.sendMessage(`\n-roomstate.
            ${x.recordOptions('channel', channel)}
            ${x.recordOptions('state', state)}`);
    }

}

module.exports = Chat;