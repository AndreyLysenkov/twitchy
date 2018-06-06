const moment = require('moment');

module.exports = (duration, config) => {
    return moment.duration(duration, config.unit).humanize();
};