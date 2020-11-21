const Discord = require("discord.js");
const { empty, footer } = require("../../json/embeds.json");
const { githubMessage } = require("../func");

module.exports = {
    name: "-help",
    async execute(userInput) {
        // Assemble embedded message
        const embedded = new Discord.MessageEmbed()
            .setColor(0x0099ff)
            .setAuthor("pudding <command> <sub_command>", empty, githubURL)
            .setThumbnail(
                "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/263/service-dog_1f415-200d-1f9ba.png"
            )
            .addFields(
                {
                    name: `-time <name_of_country/city/state>`,
                    value:
                        "Tells what time it is in **country/city/state**, plus a small info from wikipedia ",
                },
                {
                    name: `-help`,
                    value:
                        "What you're seeing right now, click the Command: <link> to see the github link",
                },
                {
                    name: `-preach`,
                    value: "Pudding reads a bible verse",
                }
            )
            .addField(empty, githubMessage(this.name))
            .setFooter(footer.text, footer.icon_url);

        // Send message
        sendMessage(userInput, embedded, this.name);
    },
};
