const MainEvent = require('./main.js');

class UserEvent extends MainEvent  {

    constructor() {
        super();
    }

    parse_badges() {
        return this.entry.user.badge.list.join(this.config.badges.separator);
    }

    parse_username() {
        return this.config.username.template.format(this.entry.user.name);
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);

        this.entry.badges = this.parse_badges();
        this.entry.username = this.parse_username();

        return this.config.template.format(this.entry);
    }

}

module.exports = UserEvent;