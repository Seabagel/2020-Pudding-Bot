// Dependencies
const Discord = require("discord.js");

// JSON
const {
    empty,
    footer,
    bibleAPI,
    thumbnails,
} = require("../../json/templates.json");

// Functions
const {
    githubMessage,
    sendMessage,
    catchRespond,
    capitalize,
    fetchAPI,
} = require("../utils/func.js");

module.exports = {
    name: "preach",
    async execute(userInput) {
        fetchAPI(bibleAPI)
            .then((response) => {
                // Assemble embedded message
                try {
                    const embedded = new Discord.MessageEmbed()
                        .setColor("#cc99cd")
                        .setTitle(response[0].bookname)
                        .setThumbnail(thumbnails[1])
                        .addFields({
                            name: `Chapter: ${response[0].chapter}:${response[0].verse}`,
                            value: capitalize(response[0].text),
                        })
                        .addField(empty, githubMessage(this.name))
                        .setFooter(footer.text, footer.icon_url);

                    // Send message
                    sendMessage(userInput, embedded, this.name);
                } catch (error) {
                    catchRespond(userInput);
                }
            })
            .catch((err) => catchRespond(userInput));
    },
};
