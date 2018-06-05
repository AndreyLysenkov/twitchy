const MainEvent = require('./main.js');

class DisconnectedEvent extends MainEvent {

    constructor() {
        super();
    }

    parse_reason() {
        return this.entry.data.argument[1];
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.reason = this.parse_reason();
        
        return this.config.template.format(this);
    }

}

module.exports = DisconnectedEvent;