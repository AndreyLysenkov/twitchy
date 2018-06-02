module.exports = (data) => {
    // TODO; tmp zone; tmp function;
    let result = "\n---\n";

    let EntryParser = require('./entry.js');
    let entry = new EntryParser(data);
    entry.parse();

    // add badges;
    if (entry.user && entry.user.badge && entry.user.badge.list) {
        result += "\nbadges: [ ";
        entry.user.badge.list.forEach((badge) => {
            result += `, ${badge}`;
        });
        result += " ];\n";
    }

    // add username;
    if (entry.user.name) {
        result += "\nusername: {display} [{id}]\n".format(entry.user.name);
    }

    // tmp zone; still here;
    result += `\n\`\`\`json\n${JSON.stringify(data, null, 4)}\n\`\`\`\n`;

    return result;
};