const core = require('../core.js');
const config = core.config.main.stringify;

function getEvent(entry) {
    if (!config.event.list.includes(entry.data.event))
        return config.event.id.unsupported;
    
    return config.event.id[entry.data.event];
}

function requireEvent(event) {
    return require(config.event.require.format(event));
}

function parseEvent(EventType, event_config, entry) {
    let parser = new EventType();
    return parser.parse(event_config, entry);
}

module.exports = (entry) => {
    let event = getEvent(entry);
    return parseEvent(requireEvent(event), event, entry);
};