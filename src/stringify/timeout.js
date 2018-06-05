const moment = require('moment');

const BanEvent = require('./ban.js');

class TimeoutEvent extends BanEvent {

    constructor() {
        super();
    }

    parse_duration() {
        let time = this.entry.data.argument[4];
        return moment.duration(time, this.config.unit).humanize();
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.duration = this.parse_duration();

        return this.config.template.format(this);
    }

}

module.exports = TimeoutEvent;