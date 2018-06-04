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

    parse_target() {
        return this.entry.data.argument[2];
    }

    parse_viewers() {
        return this.entry.data.argument[3];
    }

    parse(entry) {
        this.entry = entry;
        
        this.time = this.parse_time();
        this.target = this.parse_target();
        this.viewers = this.parse_viewers();

        return this.config.template.format(this);
    }

}

module.exports = ActionEvent;