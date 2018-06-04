class UnsupportedEvent {

    constructor(config) {
        this.config = config;
    }

    parse(entry) {
        this.entry = entry;
        this.stringified = JSON.stringify(this.entry, null, this.config.json_space);
        return this.config.template.format(this);
    }

}

module.exports = UnsupportedEvent;