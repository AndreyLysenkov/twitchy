const moment = require('moment');

module.exports = (duration, config) => {
    moment.duration(duration, config.unit).humanize();
};