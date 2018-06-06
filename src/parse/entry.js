const core = require('../core.js');
const config = core.config.main.parser.entry;

class EntryParser {

    constructor(data) {
        this.data = data;
        this.time = data.time;
        this.event = data.event;
    }

    parse() {
        this.event = this.parse_event();
        this.parse_simple();
    }

    parse_event() {
        return this.data.event;
    }

    parse_simple() {
        config.list.forEach((arg) => this.parse_simple_arg(this, arg));
    }

    parse_simple_arg_fetchParser(name) {
        try {
            return require(`./arg/${name}.js`);
        } catch (e) {
            return null;
        }
    }

    parse_simple_arg(self, arg) {
        let arg_config = config.id[arg];
        let arg_position = arg_config.position[self.event];
        if (!arg_position)
            return null;
        let result = self.data.argument[arg_position];

        let parser = self.parse_simple_arg_fetchParser(arg_config.id);
        if (parser)
            result = parser(result, arg_config, self.data);

        self[arg_config.id] = result;
    }

}

module.exports = EntryParser;