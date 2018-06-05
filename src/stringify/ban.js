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
        return this.entry.data.argument[2];
    }

    parse_username() {
        return this.entry.data.argument[1];
    }

    parse(entry) {
        this.entry = entry;
        
        this.time = this.parse_time();
        this.username = this.parse_username();
        this.reason = this.parse_reason();

        return this.config.template.format(this);
    }

}

module.exports = ActionEvent;