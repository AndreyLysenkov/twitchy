const core = require('../core.js');
const config = core.config.main.discord.emojie;

class Emojie {

    static fetch_get_guild(guildId) {
        let guild = core.app.bot.discord.client.guilds.get(guildId);
        if (!guild)
            return null;
        return guild.emojis;
    }

    static fetch_get_all(guildId) {
        let emojis = Emojie.fetch_get_guild(guildId);
        if (!emojis)
            return null;
        let list = [];
        emojis.forEach((emojie) => {
            list.push({
                name: emojie.name,
                code: emojie.toString()
            });
        });
        return list;
    }

    static fetch_get_auto(guildId) {
        return Emojie.fetch_get_all(guildId);
    }

    static fetch_get_blackWhite(guildId, list, isBlack) {
        let list_all = Emojie.fetch_get_auto(guildId);
        if (!list)
            return null;
        let result = [];
        list_all.forEach((emojie) => {
            if (isBlack !== list.includes(emojie.name))
                result.push(emojie);
        });
        return result;
    }

    static fetch_get_black(guildId, list) {
        return Emojie.fetch_get_blackWhite(guildId, list, true);
    }

    static fetch_get_white(guildId, list) {
        return Emojie.fetch_get_blackWhite(guildId, list, false);
    }

    static add_emojie(emojie) {
        Emojie.list.push(emojie.name);
        Emojie.codes[emojie.name] = emojie.code;
    }

    static add_emojies(list) {
        list.forEach(Emojie.add_emojie);
    }

    static fetch(guildConfig) {
        let emojie_data = guildConfig.config.emojie;
        if (!emojie_data)
            return;

        let mode = emojie_data.mode;
        let list = emojie_data.list;
        let result = [];
        let guildId = guildConfig.guildId;
        switch (mode) {
            case config.mode.auto:
                result = Emojie.fetch_get_auto(guildId);
                break;
            case config.mode.white:
                result = Emojie.fetch_get_white(guildId, list);
                break;
            case config.mode.black:
                result = Emojie.fetch_get_black(guildId, list);
                break;
        }

        Emojie.add_emojies(result);
    }

    static replace(content) {
        if (!content)
            return content;
        let result = content;
        Emojie.list.forEach((emojie) => {
            result = result.replace(new RegExp(emojie, 'g'), Emojie.codes[emojie]);
        });
        return result;
    }

}

Emojie.list = [];
Emojie.codes = {};

module.exports = Emojie;