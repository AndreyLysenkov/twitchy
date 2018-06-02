const fs = require('fs');

const core = require('../core.js');

const config = core.config.main.discord.guild;

class GuildConfig {

    constructor(guildId) {
        this.folder = `${core.config.location.directory.main}/${core.config.location.directory.guild}`;
        this.guildId = guildId;
        this.filename = config.file.name.format({
            'id': this.guildId
        });
        this.filepath = `${this.folder}/${this.filename}`;
        this.config = this.get();
    }

    isExist() {
        try {
            fs.accessSync(this.filepath, fs.constants.F_OK | fs.constants.W_OK);
        } catch (e) {
            return false;
        }
        return true;
    }

    require() {
        return require(`../../${this.filepath}`);
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
        fs.writeFileSync(
            `./${this.filepath}`, 
            JSON.stringify(this.config, null, config.file.spaces), 
            options);
    }

    update() {
        this.write();
    }

}

module.exports = GuildConfig;