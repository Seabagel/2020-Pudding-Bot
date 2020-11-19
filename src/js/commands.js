// Dependencies
const cheerio = require("cheerio");

// Requires
const { requestPage, capitalize } = require("./func.js");

// Send Github link
const sendGithub = (userInput) => {
    userInput.channel.send(
        "https://github.com/Seabagel/discord.js-VirtualPudding/tree/timezones"
    );
};

// Send Bible verse
let sendBible = (userInput) => {
    const url = "https://labs.bible.org/api/?passage=random&type=json";

    // Concat the resulting bible verse

    const text = `${capitalize(result[0].text)}, *${result[0].bookname} - ${
        result[0].chapter
    }:${result[0].verse}*`;

    if (!args.length) {
        return userInput.channel.send(text);
    } else {
    }

    // Send a message
    userInput.channel.send(text);
};

const sendTime = async (userInput, place) => {
    let page1 = requestPage(
        `https://www.google.com/search?q=what+time+is+it+in+${place}`
    );
    let page2 = requestPage(`https://www.google.com/search?q=${place}`);
    let page3 = requestPage(`https://en.wikipedia.org/wiki/${place}`);

    // Do stuff with results page
    let values = await Promise.all([page1, page2, page3]).then((response) => {
        // Cheerio extracts content
        // Google search: Time
        let date = cheerio("span:nth-child(1)", response[0])
            .eq(7)
            .text()
            .split("\n");
        let time = cheerio("div:nth-child(1)", response[0]).eq(21).text();
        // Google search: Place
        let placeName = cheerio("div:nth-child(1)", response[1]).eq(14).text();
        let placeInfo = cheerio("div:nth-child(1)", response[1]).eq(15).text();
        let wikipedia = cheerio("div:nth-child(1)", response[1]).eq(19).text();
        // Wikipedia search: Image
        let image =
            "https:" +
            cheerio("img.thumbborder", response[2]).eq(0).attr("src");

        // Construct and embedded message
        let embedded = {
            title: placeName,
            description: placeInfo,
            color: 7268003,
            thumbnail: {
                url: image,
            },
            fields: [
                {
                    name: time,
                    value: date[1],
                },
                {
                    name: "Date:",
                    value: date[0],
                },
                {
                    name: "Wikipedia",
                    value: wikipedia,
                },
            ],
            footer: {
                icon_url:
                    "https://github.githubassets.com/favicons/favicon.png",
                text: "hosted on Github 👨‍💻 - made with love 💌",
            },
        };

        // sends an embedded discord message
        console.log("Sending message... -!time");
        userInput.channel.send(`${date}\n${time}`);
        console.log("Message sent! -!time");
    });
};

module.exports = {
    sendGithub,
    sendTime,
};
