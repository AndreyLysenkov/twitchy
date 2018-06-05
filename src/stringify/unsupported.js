const MainEvent = require('./main.js');

class UnsupportedEvent extends MainEvent {

    constructor() {
        super();
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.stringified = JSON.stringify(this.entry.data, null, this.config.json_space);

        return this.config.template.format(this);
    }

}

module.exports = UnsupportedEvent;