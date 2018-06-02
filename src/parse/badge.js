const core = require('../core.js');
const config = core.config.main.parser.user.badge;

class User {

    constructor(data) {
        this.data = data;
        this.list = [];
    }

    parse_one(conf) {
        let parser = ((conf) => conf);
        try {
            let parser_require = require(`./${config.folder}}/${conf.name}.js`);
            parser = parser_require;
        } catch (e) { }
        return parser(conf);
    }

    parse() {
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

            conf = this.parse_one(conf);

            this.list.push(
                conf.template.format(conf)
            );
        });
    }

}

module.exports = User;