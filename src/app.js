class App {

    static start() {
        App.bot = require('./bot.js');
    }

    static stop() {
        App.bot = {};
    }

    static restart() {
        App.stop();
        App.start();
    }

}

module.exports = App;