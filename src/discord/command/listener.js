const core = require('../../core.js');
const config = core.config.main.discord.command;

class CommandListener {

    constructor(client) {
        this.events = [];
        this.register(client);
    }

    register(client) {
        let self = this;
        config.event.forEach((event) => {
            let event_require = self.require_event(client, event);
            self.events.push(event_require);
            client.on(self.config.id, event_require.call);
        });
    }

    require_event(client, event) {
        let event_config = config[event];
        let path = event_config.path;
        let EventListener = require(config.require.format({
            path: path
        }));
        let result = new EventListener(client, event_config);
        return result;
    }

}

module.exports = CommandListener;