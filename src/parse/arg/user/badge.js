const core = require('../../../core.js');

class BadgeParser {

    constructor(value, config, data) {
        this.value = value;
        this.data = data;
        this.config = config;
        this.list = [];
    }

    parse_badge(config, name, value) {
        let parser = (() => null);
        try {
            let parser_require = require(`./${this.config.folder}/${name}.js`);
            parser = parser_require;
        } catch (e) {
            core.verbose(core.config.main.log.module, `found none specific ./parse/arg/user/${this.config.folder}/${name}`, e);
        }
        return {
            name: name,
            value: value,
            config: config,
            addition: parser(config, name, value, this.data)
        };
    }

    parse() {
        if (!this.value)
            return {};
        let result = {
            list: []
        };

        let list = this.config.list;
        let self = this;
        list.forEach((badge_name) => {
            let badge_value = self.value[badge_name];
            if (!badge_value)
                return;

            let badge_config = self.config.id[badge_name];
            let parsed_badge = self.parse_badge(badge_config, badge_name, badge_value);

            result.list.push(
                badge_config.template.format(parsed_badge)
            );
        });

        return result;
    }

}

module.exports = BadgeParser;