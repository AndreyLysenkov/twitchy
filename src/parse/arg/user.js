const StateParser = require('./user/state.js');

module.exports = (userstate, config, data) => {
    let parser = new StateParser(userstate, config, data);
    return parser.parse();
};