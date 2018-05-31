class Message {

    constructor(data) {
        this.data = data;
    }

    parse() {
        this.user = this.parse_user();
    }

    parse_user() {
        let parser = require('./user.js');
        let result = new parser(this.data);
        result.parse();
        return result;
    }

}

module.exports = Message;