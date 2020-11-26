// Dependencies
const Discord = require("discord.js");

// JSON
const { empty, footer, thumbnails } = require("../../json/templates.json");

// Functions
const { githubMessage, sendMessage, catchRespond } = require("../utils/func");

module.exports = {
    name: "help",
    execute(userInput, args) {
        // Assemble embedded message
        try {
            const embedded = new Discord.MessageEmbed()
                .setColor(0x0099ff)
                .setTitle("Commands:")
                .setDescription("`pudding <command>` <arguments>")
                .setThumbnail(thumbnails[2])
                .addFields(
                    {
                        name: "`pudding -time` <name_of_country/city/state>",
                        value:
                            "Tells what time it is in **country/city/state**, plus a small info from wikipedia ",
                    },
                    {
                        name: "`pudding -help`",
                        value:
                            "What you're seeing right now, click the Command: <link> to see the github link",
                    },
                    {
                        name: "`pudding -preach`",
                        value: "Pudding reads a bible verse",
                    }
                )
                .addField(empty, githubMessage(this.name))
                .setFooter(footer.text, footer.icon_url);

            // Send message
            sendMessage(userInput, embedded, this.name);
        } catch (error) {
            catchRespond(userInput);
        }
    },
};
