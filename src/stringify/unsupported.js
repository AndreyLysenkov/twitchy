const core = require('../core.js');
const config = core.config.main.event.id.unsuported;

class UnsupportedEvent {

    constructor(entry) {
        this.entry = entry;
    }

    parse() {
        return JSON.stringify(entry, null, config.json_space);
    }

}

module.exports = UnsupportedEvent;