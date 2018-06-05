const MainEvent = require('./main.js');

class UnhostEvent extends MainEvent {

    constructor() {
        super();
    }

    parse_viewers() {
        return this.entry.data.argument[2];
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);
        
        this.viewers = this.parse_viewers();
        
        return this.config.template.format(this);
    }

}

module.exports = UnhostEvent;