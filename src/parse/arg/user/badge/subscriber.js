const customizer = require('./subscriber/customizer.js');

function default_badge(config, value) {
    let digit1 = Math.floor(value / config.base);
    let digit2 = value % config.base;
    return config.count.format(config.digit[digit1], config.digit[digit2]);
}

module.exports = (config, name, value, data) => {
    let channel = data.channel;
    if (!channel)
        return default_badge(config, value);

    let badge = customizer.getBadge(channel, value);
    if (!badge)
        return default_badge(config, value);
    return badge;
};