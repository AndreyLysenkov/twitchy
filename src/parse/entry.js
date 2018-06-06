const UserParser = require('./user.js');

const core = require('../core.js');
const config = core.config.main.parser.entry;

class Entry {

    constructor(data) {
        this.data = data;
    }

    parse() {
        this.event = this.parse_event();
        this.user = this.parse_user();
        this.parse_simple();
    }

    parse_event() {
        return this.data.event;
    }

    parse_user() {
        let result = new UserParser(this.data);
        result.parse();
        return result;
    }

    parse_simple() {
        config.list.forEach((arg) => this.parse_simple_arg(this, arg));
    }

    parse_simple_arg(self, arg) {
        let arg_config = config.id[arg];
        let arg_position = arg_config.position[self.event];
        if (!arg_position)
            return null;
        self[arg_config.id] = self.data.argument[arg_position];
    }

}

module.exports = Entry;