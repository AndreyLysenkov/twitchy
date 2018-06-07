const customizer = require('./customizer.js');

function value_to_digit_array(conf, value) {
    let result = [];
    for (; value > 0; value = Math.floor(value / conf.base)) {
        result.push(value % conf.base);
    }
    return result;
}

function value_shorten(conf, value) {
    let label = null;
    conf.shorten.forEach((x) => {
        if ((value.length > x.count)
            && ((!label) || (label.count < x.count)))
            label = x;
    });
    conf.label = label;
    if (!label)
        return value;
    let new_value = [];
    for (let i = 0; i < value.length; i++) {
        if (i >= label.count)
            new_value.push(value[i]);
    }
    return new_value;
}

function default_badge(config, value) {
    let arr = value_to_digit_array(config, value);
    arr = value_shorten(config, arr);
    let result = "";
    arr.forEach((i) => {
        result = config.count.format(config.digit[i], result);
    });
    return config.default_template.format({
        result: result,
        config: config
    });
}

module.exports = (config, name, value, data) => {
    // TODO; tmp;
    require('../../../../core.js').vebose(JSON.stringify({
        config: config,
        name: name,
        value: value,
        data: data
    }, null, 4));

    let channel = data.channel;
    if (!channel)
        return default_badge(config, value);

    let badge = customizer.getBadge(channel, config.type, value);
    if (!badge)
        return default_badge(config, value);
    return badge;
};