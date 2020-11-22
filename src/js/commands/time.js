const Discord = require("discord.js");
const {
    githubMessage,
    sendMessage,
    requestPage,
    capitalize,
} = require("../func.js");
const { empty, footer } = require("../../json/embeds.json");

// Fetch html pages
const cheerio = require("cheerio");

module.exports = {
    name: "time",
    async execute(userInput, args) {
        requestPage(
            `https://www.google.com/search?q=what+time+is+it+in+${args.join(
                "+"
            )}`
        ).then((response) => {
            // Get the text from html
            let dateTimezone = cheerio("span:nth-child(1)", response)
                .eq(7)
                .text()
                .split("\n");
            let time = cheerio("div:nth-child(1)", response).eq(21).text();
            let placeName = capitalize(args.join(" "));

            // Assemble embedded message
            const embedded = new Discord.MessageEmbed()
                .setColor(7268003)
                .setTitle(placeName)
                .addFields(
                    {
                        name: time,
                        value: dateTimezone[1],
                    },
                    {
                        name: "Date:",
                        value: dateTimezone[0],
                    }
                )
                .setThumbnail(
                    "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                )
                .addField(empty, githubMessage(this.name))
                .setFooter(footer.text, footer.icon_url);

            // Send message
            sendMessage(userInput, embedded, this.name);
        });
    },
};
