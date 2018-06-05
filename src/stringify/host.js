const MainEvent = require('./main.js');

class HostEvent extends MainEvent {

    constructor() {
        super();
    }

    parse_target() {
        return this.entry.data.argument[2];
    }

    parse_viewers() {
        return this.entry.data.argument[3];
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.target = this.parse_target();
        this.viewers = this.parse_viewers();

        return this.config.template.format(this);
    }

}

module.exports = HostEvent;