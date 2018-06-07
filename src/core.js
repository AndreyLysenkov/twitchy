// load enviroment variables;
const data_directory = process.env.npm_package_config_data_directory;
const guild_config_directory = process.env.npm_package_config_guild_config_directory;
const lang_file = process.env.npm_package_config_lang_file;
const config_file = process.env.npm_package_config_config_file;
const private_config_file = process.env.npm_package_config_private_config_file;

class Core {

    static register_logger_receiver_types() {
        Core.logger.type = {};
        let types = Core.config.main.log.receiver.list;

        types.forEach((type) => {
            Core.logger.type[type] = require(`./log/receiver/${type}.js`);
        });
    }

    static register_logger_receiver_items() {
        let items = Core.config.main.log.list;

        items.forEach((item) => {
            let type = Core.logger.type[item.type];
            Core.logger.core.subscribe(item.levels, new type(item.options));
        });
    }

    static register_logger_receiver() {
        Core.register_logger_receiver_types();
        Core.register_logger_receiver_items();
    }

    static start() {
        Core.register_logger_receiver();
    }

}

// set configs;
Core.config = {
    lang: require(`../${data_directory}/${lang_file}`),
    main: require(`../${data_directory}/${config_file}`),
    private: require(`../${data_directory}/${private_config_file}`),
    location: {
        directory: {
            main: data_directory,
            guild: guild_config_directory
        },
        files: {
            lang: lang_file,
            config: {
                main: config_file,
                private: private_config_file
            }
        }
    }
};
Core.config.token = Core.config.private.token;
Core.config.app = Core.config.main.app;

// set logger;
Core.logger = {
    core: require('./log/core.js')
};

// set short refs to logger;
Core.verbose = (message, error) => Core.logger.core.verbose(Core.config.main.log.module, message, error);
Core.debug = (message, error) => Core.logger.core.debug(Core.config.main.log.module, message, error);
Core.log = (message, error) => Core.logger.core.log(Core.config.main.log.module, message, error);
Core.warn = (message, error) => Core.logger.core.warn(Core.config.main.log.module, message, error);
Core.error = (message, error) => Core.logger.core.error(Core.config.main.log.module, message, error);

// add string.format(); method from 'string-format' package;
const format = require('string-format');
format.extend(String.prototype, {
    discord_escape: s => s.replace(Core.config.main.discord.escape, c => '\\' + c)
});

module.exports = Core;