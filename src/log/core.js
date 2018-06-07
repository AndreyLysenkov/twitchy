const moment = require('moment');

class Logger {

    static verbose(bot_module, message) {
        Logger.send("verbose", bot_module, message);
    }

    static debug(bot_module, message, error) {
        Logger.send("debug", bot_module, message, error);
    }

    static log(bot_module, message) {
        Logger.send("main", bot_module, message);
    }

    static warn(bot_module, message, error) {
        Logger.send("warn", bot_module, message, error);
    }

    static error(bot_module, message, error) {
        Logger.send("error", bot_module, message, error);
    }

    static send(level, bot_module, message, error) {
        let log = {
            level: level,
            module: bot_module,
            message: message,
            time: moment()
        };
        if (error)
            log.error = error;
        Logger.receivers[level].forEach((receiver) => receiver.receive(log));
    }

    static subscribe(levels, receiver) {
        levels.forEach((level) => {
            if (!Logger.receivers[level])
                Logger.receivers[level] = [];
            Logger.receivers[level].push(receiver);
        });
    }

}

Logger.receivers = {
    verbose: [],
    debug: [],
    main: [],
    warn: [],
    error: []
};

module.exports = Logger;