// Dependencies
const Discord = require("discord.js");
const cheerio = require("cheerio");

// JSON
const { empty, footer, thumbnails } = require("../../json/templates.json");

// Functions
const {
    githubMessage,
    sendMessage,
    catchRespond,
    requestPage,
    capitalize,
    getRandomInt,
} = require("../utils/func.js");

module.exports = {
    name: "time",
    async execute(userInput, args) {
        // Join args for URL
        let argsURL = args.join("+");
        let argsString = capitalize(args.join(" "));

        // Static link to search engines
        let timeURL = `https://www.google.com/search?q=what+time+is+it+in+${argsURL}`;
        let picURL = {
            uri: `https://results.dogpile.com/serp?qc=images&q=${argsURL}`,
            method: "GET",
            headers: {
                Accept: "text/html",
                "User-Agent": "Chrome",
            },
            transform: (body) => cheerio.load(body),
        };

        // Search result which grabs timezone, date, and time
        let timeWebpage = requestPage(timeURL)
            .then((res) => {
                // Returns a Promise of object containing date/time
                let $ = cheerio.load(res);
                let dateTimezone = $("span:nth-child(1)")
                    .eq(7)
                    .text()
                    .split("\n");
                let time = $("div:nth-child(1)").eq(21).text();
                return { dateTimezone, time };
            })
            .catch((err) => catchRespond(userInput));

        // Search result and grab a random picture
        let pictureWebpage = requestPage(picURL)
            .then((response) => {
                // Returns a Promise of picture URL
                let urls = response(".image a.link");
                let picture = urls.eq(getRandomInt(urls.length)).attr("href");
                if (!urls.length) return console.log("Can't get pictures");
                return { picture };
            })
            .catch((err) => catchRespond(userInput));

        // Wait for both pages to load
        await Promise.all([timeWebpage, pictureWebpage]).then((res) => {
            // Assemble embedded message
            try {
                let embedded = new Discord.MessageEmbed()
                    .setColor(7268003)
                    .setTitle(argsString)
                    .addFields(
                        {
                            name: res[0].time,
                            value: res[0].dateTimezone[1],
                        },
                        {
                            name: "Date:",
                            value: res[0].dateTimezone[0],
                        }
                    )
                    .setImage(res[1].picture)
                    .setThumbnail(thumbnails[0])
                    .addField(empty, githubMessage(this.name))
                    .setFooter(footer.text, footer.icon_url);
                // Send message
                sendMessage(userInput, embedded, this.name);
            } catch (error) {
                catchRespond(userInput);
            }
        });
    },
};
