const core = require('../core.js');
const tz = require('moment-timezone');

class MainEvent {

    constructor() { }

    parse_time() {
        let time = this.entry.time;
        this.entry.time = time
            .tz(core.config.app.time.zone)
            .format(core.config.app.time.format);
    }

    parse_badge() {
        if (!this.entry.user
            || !this.entry.user.badge
            || !this.config.badge
            || !this.config.badge.join)
            return;
        this.entry.user.badge.stringify = this.entry.user.badge.list.join(this.config.badge.join);
    }

    parse(config, entry) {
        this.config = config;
        this.entry = entry;

        this.parse_time();
        this.parse_badge();

        return this.config.template.format(entry);
    }

}

module.exports = MainEvent;