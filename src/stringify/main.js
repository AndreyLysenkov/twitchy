const core = require('../core.js');
const tz = require('moment-timezone');

class MainEvent {

    constructor() {}

    parse_time(entry) {
        let time = entry.time;
        return time
            .tz(core.config.app.time.zone)
            .format(core.config.app.time.format);
    }

    parse(config, entry) {
        this.config = config;

        entry.time = this.parse_time(entry);

        return this.config.template.format(entry);
    }

}

module.exports = MainEvent;