const core = require('../core.js');
const config = core.config.main.stringify.event.id.unsupported;

class UnsupportedEvent {

    constructor(entry) {
        this.entry = entry;
    }

    parse() {
        this.stringified = JSON.stringify(this.entry, null, config.json_space);
        return config.template.format(this);
    }

}

module.exports = UnsupportedEvent;