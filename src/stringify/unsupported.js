const MainEvent = require('./main.js');

class UnsupportedEvent extends MainEvent {

    constructor() {
        super();
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);

        this.entry.stringified = JSON.stringify(this.entry, null, this.config.json_space);

        return this.config.template.format(this.entry);
    }

}

module.exports = UnsupportedEvent;