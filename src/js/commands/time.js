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
        // Request webpage
        let searchGoogle = args.join("+"); // Google Search
        let page1 = requestPage(
            `https://www.google.com/search?q=what+time+is+it+in+${searchGoogle}`
        );
        let page2 = requestPage(
            `https://www.google.com/search?q=${searchGoogle}`
        );
        let searchWikia = args.join("_"); // Wikipedia search
        let page3 = requestPage(`https://en.wikipedia.org/wiki/${searchWikia}`);

        await Promise.all([page1, page2, page3]).then((response) => {
            // Get the text from html
            let placeName = capitalize(args.join(" "));
            let timeblob = cheerio("span:nth-child(1)", response[0])
                .eq(7)
                .text()
                .split("\n");
            let timezone = timeblob[1];
            let date = timeblob[0];
            let time = cheerio("div:nth-child(1)", response[0]).eq(21).text();
            let placeInfo = cheerio("div:nth-child(1)", response[1])
                .eq(16)
                .text();
            let wikipedia = cheerio("div:nth-child(1)", response[1])
                .eq(19)
                .text();
            let image =
                "https:" +
                cheerio("img.thumbborder", response[2]).eq(0).attr("src");

            // Slice info and wikipedia
            if (placeInfo.length > 32) {
                placeInfo = placeInfo.slice(0, 32);
            }
            if (wikipedia.length > 256) {
                wikipedia = wikipedia.slice(0, 256);
            }

            // Assemble embedded message
            const embedded = new Discord.MessageEmbed()
                .setColor(7268003)
                .setThumbnail(image)
                .setTitle(placeName)
                .setDescription(placeInfo)
                .addFields(
                    {
                        name: time,
                        value: timezone,
                    },
                    {
                        name: "Date:",
                        value: date,
                    },
                    {
                        name: "Wikipedia",
                        value: wikipedia,
                    }
                )
                .addField(empty, githubMessage(this.name))
                .setFooter(footer.text, footer.icon_url);

            // Send message
            sendMessage(userInput, embedded, this.name);
        });
    },
};
