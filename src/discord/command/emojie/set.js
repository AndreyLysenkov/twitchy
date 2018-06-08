class EmojieCommand {

    static call(data) {
        if (data.args.length < 1)
            return;

        let mode = data.args[0];
        data.args.shift();

        let parsed_mode = data.config.mode.value[mode];
        if (!parsed_mode)
            return;

        let mode_config = data.config.mode[parsed_mode];
        let receiver = EmojieCommand.mode_require(mode_config);
        data.config = mode_config;
        receiver.call(data);
    }

    static mode_require(config) {
        return require(`./${config.path}.js`);
    }

}

module.exports = EmojieCommand;