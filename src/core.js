// add string.format(); method from 'string-format' package;
const format = require('string-format');
format.extend(String.prototype, {});

// load enviroment variables;
const data_directory = process.env.npm_package_config_data_directory;
const guild_config_directory = process.env.npm_package_config_guild_config_directory;
const lang_file = process.env.npm_package_config_lang_file;
const config_file = process.env.npm_package_config_config_file;
const private_config_file = process.env.npm_package_config_private_config_file;

class Core {

    static start() {
        
    }

}

// set configs;
Core.config = {
    "lang": require(`../${data_directory}/${lang_file}`),
    "main": require(`../${data_directory}/${config_file}`),
    "private": require(`../${data_directory}/${private_config_file}`),
    "location": {
        "directory": {
            "main": data_directory,
            "guild": guild_config_directory
        },
        "files": {
            "lang": lang_file,
            "config": {
                "main": config_file,
                "private": private_config_file
            }
        }
    }
};
Core.config.token = Core.config.private.token;

module.exports = Core;