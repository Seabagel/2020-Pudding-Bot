const cheerio = require("cheerio");
const { requestPage, capitalize, fetchAPI, sendMessage } = require("./func.js");
const { githubURL } = require("../../config/config.json");

const sendGithub = (userInput, commandName) => {
    let embedded = {
        color: 0x0099ff,
        author: {
            name: "pudding <command> <sub_command>",
            url: githubURL,
        },
        thumbnail: {
            url:
                "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/263/service-dog_1f415-200d-1f9ba.png",
        },
        fields: [
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
            },
            {
                name: "\u200b",
                value: `**Command:** [pudding *-help*](${githubURL})`,
            },
        ],
        footer: {
            icon_url: "https://github.githubassets.com/favicons/favicon.png",
            text: "hosted on Github 👨‍💻 - made with love 💌",
        },
    };
    sendMessage(userInput, embedded);
};

let sendBible = async (userInput) => {
    const url = "https://labs.bible.org/api/?passage=random&type=json";
    const result = fetchAPI(url).then((response) => {
        let text = `*${response[0].bookname} (${response[0].chapter}:${
            response[0].verse
        })*    ${capitalize(response[0].text)}`;

        let embedded = {
            color: "#cc99cd",
            author: {
                name: response[0].bookname,
                url: url,
            },
            thumbnail: {
                url:
                    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/orthodox-cross_2626.png",
            },
            fields: [
                {
                    name: `${response[0].chapter}:${response[0].verse}`,
                    value: capitalize(response[0].text),
                },
                {
                    name: "\u200b",
                    value: `**Command:** [pudding *-preach*](${githubURL})`,
                },
            ],
            footer: {
                icon_url:
                    "https://github.githubassets.com/favicons/favicon.png",
                text: "hosted on Github 👨‍💻 - made with love 💌",
            },
        };

        try {
            userInput.channel.send({ embed: embedded });
            console.log("Sending message... -preach");
        } catch (error) {
            console.log("Error: " + error);
        }
    });
};

const sendTime = async (userInput, args) => {
    let searchGoogle = args.join("+");
    let searchWikia = args.join("_");
    let place = args.join(" ");

    let page1 = requestPage(
        `https://www.google.com/search?q=what+time+is+it+in+${searchGoogle}`
    );
    let page2 = requestPage(`https://www.google.com/search?q=${searchGoogle}`);
    let page3 = requestPage(`https://en.wikipedia.org/wiki/${searchWikia}`);

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
        let placeInfo = cheerio("div:nth-child(1)", response[1]).eq(16).text();
        let wikipedia = cheerio("div:nth-child(1)", response[1]).eq(19).text();
        if (placeInfo.length > 32) {
            placeInfo = placeInfo.slice(0, 32);
        }
        if (wikipedia.length > 256) {
            wikipedia = wikipedia.slice(0, 256);
        }

        // Wikipedia search: Image
        let image =
            "https:" +
            cheerio("img.thumbborder", response[2]).eq(0).attr("src");

        // Construct and embedded message
        let embedded = {
            color: 7268003,
            thumbnail: {
                url: image,
            },
            fields: [
                {
                    name: capitalize(place.toLowerCase()),
                    value: placeInfo,
                },
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
                {
                    name: "\u200b",
                    value: `**Command:** [pudding *-time*](${githubURL})`,
                },
            ],
            footer: {
                icon_url:
                    "https://github.githubassets.com/favicons/favicon.png",
                text: "hosted on Github 👨‍💻 - made with love 💌",
            },
        };

        // sends an embedded discord message
        try {
            userInput.channel.send({ embed: embedded });
            console.log("Sending message... -time");
        } catch (error) {
            console.log("Error: " + error);
        }
    });
};

module.exports = {
    sendGithub,
    sendTime,
    sendBible,
};
