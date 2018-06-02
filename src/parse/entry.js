const UserParser = require('./user.js');
const MessageParser = require('./message.js');

class Entry {

    constructor(data) {
        this.data = data;
    }

    parse() {
        this.user = this.parse_user();
        this.message = this.parse_message();
    }

    parse_user() {
        let result = new UserParser(this.data);
        result.parse();
        return result;
    }

    parse_message() {
        let result = new MessageParser(this.data);
        result.parse();
        return result;
    }

}

module.exports = Entry;