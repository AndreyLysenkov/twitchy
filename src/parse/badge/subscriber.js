module.exports = (conf) => {
    let digit1 = Math.floor(conf.value / conf.base);
    let digit2 = conf.value % conf.base;
    conf.addition = conf.count.format(conf.digit[digit1], conf.digit[digit2]);
    return conf;
};