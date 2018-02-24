class LogReceiver {

    constructor(method, level) {
        this.method = method;
        this.level = level == undefined ? 0 : level;
    }

    log(message, level) {
        if (level >= this.level)
            this.method(message);
    }

}

module.exports = LogReceiver;