const MainEvent = require('./main.js');

class SubEvent extends MainEvent {

    constructor() {
        super();
    }

    parse_normal_tier(config, entry) {
        return config.tier[entry.method.tier];
    }

    parse_normal(config, entry) {
        this.entry.parsed = {
            template: config.template,
            tier: this.parse_normal_tier(config, entry)
        };
    }

    parse_prime(config) {
        this.entry.parsed = {
            template: config.prime.template
        };
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);

        entry.addition = (entry.method.prime) ?
            this.parse_prime(config, entry)
            : this.parse_normal(config, entry);

        if (!entry.months)
            entry.months = 0;

        if (!entry.content)
            entry.content = config.content.none;

        return this.entry.parsed.template.format(entry);
    }

}

module.exports = SubEvent;