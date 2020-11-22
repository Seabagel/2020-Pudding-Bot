const Discord = require("discord.js");
const { githubMessage, sendMessage } = require("../func");
const { empty, footer, githubURL } = require("../../json/embeds.json");

module.exports = {
    name: "help",
    execute(userInput, args) {
        // Assemble embedded message
        const embedded = new Discord.MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Commands:")
            .setDescription("`pudding <command>` <arguments>")
            .setThumbnail(
                "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/263/service-dog_1f415-200d-1f9ba.png"
            )
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
    },
};
