const core = require('../core.js');
const tz = require('moment-timezone');

class MainEvent {

    constructor() {}

    parse_time() {
        let time = this.entry.data.time;
        return time
            .tz(core.config.app.time.zone)
            .format(core.config.app.time.format);
    }

    parse(config, entry) {
        this.config = config;
        this.entry = entry;

        this.time = this.parse_time();

        return this.config.template.format(this);
    }

}

module.exports = MainEvent;