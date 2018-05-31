class Message {

    constructor(data) {
        this.data = data;
    }

    parse() {
        this.user = this.parse_user();
    }

    parse_user_badges() {
        let parser = require('./user.js');
        return parser.parse(this.data);
    }

}

module.exports = Message;