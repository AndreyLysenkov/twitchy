module.exports = (data) => {
    // TODO; tmp zone; tmp function;
    let result = ">";

    // add badges;
    if (data.user && data.user.badge && data.user.badge.list) {
        result += "\nbadges: [ ";
        data.user.badge.list.forEach((badge) => {
            result += `, ${badge}`;
        });
        result += " ];\n";
    }

    // add username;
    if (data.user.name) {
        result += "\nusername: {display} [{id}]\n".format(data.user.name);
    }

    if (data.message && data.message.content) {
        result += `\n**${data.message.content}**\n`;
    }

    // tmp zone; still here;
    console.log(JSON.stringify(data, null, 4));

    return result;
};