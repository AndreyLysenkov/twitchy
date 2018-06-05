const MainEvent = require('./main.js');

class BanEvent extends MainEvent {

    constructor() {
        super();
    }

    parse_reason() {
        return this.entry.data.argument[3];
    }

    parse_user() {
        return this.entry.data.argument[2];
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.user = this.parse_user();
        this.reason = this.parse_reason();

        return this.config.template.format(this);
    }

}

module.exports = BanEvent;