class LogReceiver {

    constructor(method, level) {
        this.method = method;
        this.level = level == undefined ? level : 0;
    }

    log(message, level) {
        if (level >= this.level)
            this.method(message);
    }

}

module.exports = LogReceiver;