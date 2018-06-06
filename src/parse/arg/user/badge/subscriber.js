module.exports = (config, name, value) => {
    let digit1 = Math.floor(value / config.base);
    let digit2 = value % config.base;
    return config.count.format(config.digit[digit1], config.digit[digit2]);
};