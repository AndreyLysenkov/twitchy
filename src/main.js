const discord = require('discord.js');
const moment = require('moment');

const client = new discord.Client();

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on('debug', e => {
    console.log(e);
});

client.on('warn', e => {
    console.log(e);
});

client.on('error', e => {
    console.log(e);
});

client.login(require('../config/token.json').discord)
    .then(() => {
        console.log(`online`);
        console.log(client.guilds);
    });