const discord = require('discord.js');
const moment = require('moment');

const client = new discord.Client();

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on('debug', e => {
    log(e);
});

client.on('warn', e => {
    log(e);
});

client.on('error', e => {
    log(e);
});

client.login(require('../config/token.json').discord)
    .then(() => {
        log('online');
    });