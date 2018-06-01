const core = require('../../../core.js');

const chalk = require('chalk');

class ConsoleReceiver {

    constructor() {
        this.config = core.config.main.log.receiver.console;
    }

    receive(log) {
        
    }

    apply_style() {

    }

}

module.exports = ConsoleReceiver;