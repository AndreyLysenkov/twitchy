const UserEvent = require('./user.js');

class MessageEvent extends UserEvent {

    constructor() {
        super();
    }

    parse_message() {
        return this.entry.content;
    }

    parse(config, entry) {
        this.__proto__.parse(config, entry);

        this.message = this.parse_message();

        return this.config.template.format(this);
    }

}

module.exports = MessageEvent;