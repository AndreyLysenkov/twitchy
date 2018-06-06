const StateParser = require('./state.js');

module.exports = (userstate, config, config) => {
    let parser = new StateParser(userstate, config, data);
    return parser.parse();
};