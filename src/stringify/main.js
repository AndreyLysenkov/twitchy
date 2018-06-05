const core = require('../core.js');
const tz = require('moment-timezone');

class MainEvent {

    constructor(config) {
        this.config = config;
    }

    parse_time(time) {
        return time
            .tz(core.config.app.time.zone)
            .format(core.config.app.time.format);
    }

    parse(entry) {
        this.entry = entry;

        this.time = this.parse_time();

        return this.config.template.format(this);
    }

}

module.exports = MainEvent;