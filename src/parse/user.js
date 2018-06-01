const core = require('../core.js');
const config = core.config.main.config.parser.user;

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
        let positions = config.state.argument;
        let result = config.state.none;
        positions.forEach((position) => {
            if (position.event === self.data.event)
                result = position.position;
        });
        return result;
    }

    parse_state_getUserstate() {
        let arg_position = this.parse_state_findPosition();
        if (arg_position === config.state.none)
            return null;
        // TODO; positions;
        return this.data.argument[arg_position];
    }

    parse_state() {
        this.data.userstate = this.parse_state_getUserstate();
        if (!this.data.userstate)
            return;
        this.parse_state_badge();
    }

    parse_state_badge_uniqParse(conf) {
        let parser = ((conf) => conf);
        try {
            let parser_require = require(`./badge/${conf.name}.js`);
            parser = parser_require;
        } catch (e) { }
        return parser(conf);
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
            conf.name = badge;
            conf.value = value;

            conf = this.parse_state_badge_uniqParse(conf);

            this.badge.push(
                conf.template.format(conf)
            );
        });
    }

}

module.exports = User;