const BadgeParser = require('./badge.js');

class UserParser {

    constructor(value, config, data) {
        this.userstate = value;
        this.data = data;
        this.config = config;
        this.badge = [];
    }

    parse() {
        if (!this.userstate)
            return {};
        return {
            name: {
                display: this.userstate['display-name'],
                id: this.userstate.username
            },
            badge: this.parse_badge()
        };
    }

    parse_badge() {
        let badge = new BadgeParser(this.userstate.badges, this.config.badge, this.data);
        return badge.parse();
    }

}

module.exports = UserParser;