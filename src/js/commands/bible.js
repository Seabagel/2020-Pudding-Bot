const { capitalize } = require("../fn.js");

module.exports = {
    name: "bible",
    description: "Read a bible verse from the web",
    execute(message) {
        const url = "https://labs.bible.org/api/?passage=random&type=json",
        // Concat the resulting bible verse
        const text = `${capitalize(result[0].text)}, *${result[0].bookname} - ${
            result[0].chapter
        }:${result[0].verse}*`;

        if (!args.length) {
            return message.channel.send(text);
        } else {
        }

        // Send a message
        message.channel.send(text);
    },
};
