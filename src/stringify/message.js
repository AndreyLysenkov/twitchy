const core = require('../core.js');
const tz = require('moment-timezone');

class ActionEvent {

    constructor(config) {
        this.config = config;
    }

    parse_badges() {
        return this.entry.user.badge.list.join(this.config.badges.separator);
    }

    parse_username() {
        return this.config.username.template.format(this.entry.user.name);
    }

    parse_message() {
        return this.entry.message.content;
    }

    parse_time() {
        let time = this.entry.data.time;
        return time
            .tz(core.config.app.timezone)
            .format(this.config.time);
    }

    parse(entry) {
        this.entry = entry;
        
        this.time = this.parse_time();
        this.badges = this.parse_badges();
        this.username = this.parse_username();
        this.message = this.parse_message();

        return this.config.template.format(this);
    }

}

module.exports = ActionEvent;