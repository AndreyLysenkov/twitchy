const core = require('../core.js');
const config = core.config.main.parser.user;

class User {

    constructor(data) {
        this.data = data;
        this.badge = [];
    }

    parse() {
        this.state = this.parse_state();
    }

    parse_state_userstate_position() {
        let self = this;
        let positions = config.state.argument;
        let result = config.state.none;
        positions.forEach((position) => {
            if (position.event === self.data.event)
                result = position.position;
        });
        return result;
    }

    parse_state_userstate() {
        let arg_position = this.parse_state_userstate_position();
        if (arg_position === config.state.none)
            return null;
        // TODO; positions;
        return this.data.argument[arg_position];
    }

    parse_state_username() {
        this.name = {
            display: this.data.userstate["display-name"],
            id: this.data.userstate.username
        };
    }

    parse_state() {
        this.data.userstate = this.parse_state_userstate();
        if (!this.data.userstate)
            return;
        
        let BadgeParser = require('./badge.js');
        this.badge = new BadgeParser(this.data);
        this.badge.parse();

        this.parse_state_username();
    }

}

module.exports = User;