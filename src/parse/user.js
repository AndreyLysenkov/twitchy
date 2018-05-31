const config = require('../../config/config.json').config.parser.user;

class User {

    constructor(data) {
        this.data = data;
        this.badge = [];
    }

    parse() {
        this.state = this.parse_state();
    }

    parse_state_findPosition() {
        let self = this;
        let positions = config.state.arg;
        let result = config.state.arg.none;
        positions.forEach((position) => {
            if (position.event === self.data.event)
                result = position;
        });
        return result;
    }

    parse_state_getUserstate() {
        let arg_position = this.parse_state_findPosition();
        if (arg_position === config.state.arg.none)
            return null;
        return this.data[`arg${arg_position}`];
    }

    parse_state() {
        this.data.userstate = this.parse_state_getUserstate();
        if (!this.data.userstate)
            return;
        this.parse_state_badge();
    }

    parse_state_badge() {
        if (!this.data.userstate.badges)
            return;
        let badges = config.badge.list;
        let badges_config = config.badge;
        badges.forEach((badge) => {
            let value = this.data.userstate.badges[badge];
            if (value === undefined || value === null)
                return;
            let conf = badges_config[badge];
            this.badge.push(
                conf.template.format({
                    "emojie": conf.emojie,
                    "config": conf,
                    "value": value
                })
            );
        });
        // "subscriber": "12"
    }

}

module.exports = User;