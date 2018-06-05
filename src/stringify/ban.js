const moment = require('moment');

const core = require('../core.js');
const tz = require('moment-timezone');

class ActionEvent {

    constructor(config) {
        this.config = config;
    }

    parse_time() {
        let time = this.entry.data.time;
        return time
            .tz(core.config.app.time.zone)
            .format(core.config.app.time.format);
    }

    parse_reason() {
        return this.entry.data.argument[3];
    }

    parse_user() {
        return this.entry.data.argument[2];
    }

    parse_duration() {
        let time = this.entry.data.argument[4];
        if (!time)
            return null;
        let m = moment.duration(time, this.config.unit);
        return m.humanize();
    }

    parse(entry) {
        this.entry = entry;
        
        this.time = this.parse_time();
        this.user = this.parse_user();
        this.reason = this.parse_reason();
        this.duration = this.parse_duration();

        return this.config.template.format(this);
    }

}

module.exports = ActionEvent;