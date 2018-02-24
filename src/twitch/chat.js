const twitch = require('tmi.js');
const moment = require('moment');

class Chat {

    constructor(channel, config, log, emojie) {
        this.channel = `#${channel}`;
        this.config = config;
        this.client = new twitch.client({
            channels: [this.channel]
        });
        this.receiver = [];
        this.log = log;
        this.emojie = emojie;
    }

    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
        this.connectCount++;
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
            `[${moment().format('HH:mm:ss')}] ${message}`);
    }

    onAction(x, channel, userstate, message, self) {
        x.sendMessage(`**${userstate.username}**: *${message}*`);
    }

    onBan(x, channel, username, reason) {
        x.sendMessage(`${username} was banned due to  ${reason}`);
    }

    onChat(x, channel, userstate, message, self) {
        x.sendMessage(`**${userstate.username}**: ${message}`);
    }

    onCheer(x, channel, userstate, message) {
        x.sendMessage(`**${userstate.username}** has cheered up streamer with ${userstate.bits} bits`);
    }

    onClearChat(x, channel) {
        x.sendMessage(`**CHAT HAS BEEN CLEARED**`)
    }

    onConnected(x, adress, port) {
        x.log(`**CONNECTED**`);
    }

    onConnecting(x, adress, port) {
        x.log(`*connecting*`);
    }

    onDisconnect(x, reason) {
        x.sendMessage(`*disconnected due to ${reason == "" ? "no reason at all" : reason}*`);
        this.connect();
    }

    onEmoteOnly(x, channel, enabled) {
        x.sendMessage(`*Emote only is **${enabled ? "enabled" : "disabled"}**`);
    }

    onHosted(x, channel, username, viewers) {
        x.sendMessage(`*you have been hosted by **${username}** with **${viewers}** viewvers*`);
    }

    onHosting(x, channel, target, viewers) {
        x.sendMessage(`*now hosting **${target}** with **${viewers}** viewvers*`);
    }

    onJoin(x, channel, username, self) {
        x.sendMessage(`***${username}** joined*`);
    }

    onLogon(x) {
        x.log(`*logged*`);
    }

    onMessage(x, channel, userstate, message, self) {
        x.sendMessage(`**${userstate.username}** (${userstate["message-type"]}): ${message}`);
    }

    onMod(x, channel, username) {
        x.sendMessage(`***${username}** is mod now*`);
    }

    onNotice(x, channel, msgid, message) {
        x.sendMessage(`*the message \`${message}\` was rejected [${msgid}]*`);
    }

    onPing() {
        x.sendMessage(`*ping was received*`);
    }

    onPong(latency) {
        x.sendMessage(`*pong was received **${latency}ms***`);
    }

    onR9kbeta(x, channel, enabled) {
        x.sendMessage(`*r9kbeta was ${enabled ? "enabled" : "disabled"}*`);
    }

    onReconnect(x) {
        x.sendMessage(`*reconnecting*`);
    }

    onResub(x, channel, username, months, message) {
        x.sendMessage(`**${username}** RESUB FOR **${months}** months \n${message}`);
    }

    onServerChange(x, channel) {
        x.sendMessage(`*${channel} server cluster changed*`);
    }

    onSlowmode(x, channel, enabled, length) {
        x.sendMessage(`*slowmode is ${enabled ? `enabled: message every ${length} seconds` : "disabled"}*`);
    }

    onSubscribers(x, channel, enabled) {
        x.sendMessage(`*subscribers only mode is ${enabled ? "enabed" : "disabled"}*`);
    }

    onSubscription(x, channel, username, method) {
        x.sendMessage(`**${username}** SUBSCRIBED ${method}`);
    }

    onTimeout(x, channel, username, reason, duration) {
        x.sendMessage(`***${username}** was muted for ${duration}* seconds due to ${reason == "" ? "unspecified reason" : reason}`);
    }

    onUnhost(x, channel, viewers) {
        x.sendMessage(`*stoped hosting with ${viewers} viewers*`);
    }

    onUnmod(x, channel, username) {
        x.sendMessage(`**${username}** is no longer a moder`);
    }

    onWhisper(x, from, userstate, message, self) {
        x.sendMessage(`*got whisper from ${from}*: ${message}`);
    }

}

module.exports = Chat;