const Discord = require("discord.js");
const {
    githubMessage,
    sendMessage,
    capitalize,
    fetchAPI,
} = require("../func.js");
const { empty, footer, bibleAPI } = require("../../json/embeds.json");

module.exports = {
    name: "preach",
    async execute(userInput) {
        fetchAPI(bibleAPI).then((response) => {
            // Assemble embedded message
            const embedded = new Discord.MessageEmbed()
                .setColor("#cc99cd")
                .setTitle(response[0].bookname)
                .setThumbnail(
                    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/orthodox-cross_2626.png"
                )
                .addFields({
                    name: `Chapter: ${response[0].chapter}:${response[0].verse}`,
                    value: capitalize(response[0].text),
                })
                .addField(empty, githubMessage(this.name))
                .setFooter(footer.text, footer.icon_url);

            // Send message
            sendMessage(userInput, embedded, this.name);
        });
    },
};
