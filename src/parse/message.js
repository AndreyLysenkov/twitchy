const core = require('../core.js');
const config = core.config.main.parser.message;

class Message {

    constructor(data) {
        this.data = data;
        this.message = null;
    }

    parse_event() {
        let event_name = this.data.event;
        let event = null;
        config.argument.forEach((arg) => {
            if (event_name != arg.event)
                return;
            event = arg;
        });
        return event;
    }

    parse() {
        this.config = this.parse_event();
        if (!this.config)
            return;

        let event = this.parse_event();
        if (!event)
            return;
        
        // tmp; TODO; add emojie support
        this.content = this.data.argument[event.position];
    }

}

module.exports = Message;