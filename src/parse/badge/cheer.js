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

module.exports = (conf) => {
    let arr = value_to_digit_array(conf, conf.value);
    arr = value_shorten(conf, arr);
    let result = "";
    arr.forEach((i) => {
        result = conf.count.format(conf.digit[i], result);
    });
    if (conf.label)
        conf.label.pattern.format(result, conf.label.label);
    conf.addition = result;
    return conf;
};