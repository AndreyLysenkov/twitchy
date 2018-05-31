const fs = require('fs');

const common = require('common.js');

const config = require('../../config/bot.json').guild;

class GuildConfig {

    constructor(guildId) {
        this.guildId = guildId;
        this.filename = config.file.name.format({
            'id': this.guildId
        });
        this.config = this.get();
    }

    isExist() {
        try {
            fs.accessSync(this.filename, fs.constants.F_OK | fs.constants.W_OK);
        } catch (e) {
            return false;
        }
        return true;
    }

    require() {
        return require(this.filename);
    }

    get() {
        if (!this.isExist())
            this.createFile();
        return this.require();
    }

    createFile() {
        this.config = config.file.content;
        this.write(config.file.options.onCreate);
    }

    write(options) {
        if (!options)
            options = config.file.options.onRewrite;
        fs.writeFile(
            this.getFilename(), 
            JSON.stringify(config.file.content), 
            options);
    }

    update() {
        this.write();
    }

}

module.exports = GuildConfig;