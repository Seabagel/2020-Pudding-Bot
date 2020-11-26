// Dependencies
import { Message, MessageEmbed } from "discord.js";
import cheerio from "cheerio";

// JSON
import { empty, footer, thumbnails } from "../../json/templates.json";

// Default Functions
import messg from "../utils/default_command_imports";

// Additional Functions
import { capitalize, requestPage, getRandomInt } from "../utils/func";

interface command {
    readonly cmnd_name: string;
    execute: (userInput: Message, args?: string[]) => void;
}

export class command_time implements command {
    cmnd_name: "time";
    async execute(userInput, args) {
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
        let timeWebpage: Promise<void | string[]> = requestPage(timeURL)
            .then((res) => {
                // Returns a Promise of object containing date/time
                let $ = cheerio.load(res);
                let dateTimezone: string = $("span:nth-child(1)")
                    .eq(7)
                    .text()
                    .split("\n");
                let time: string = $("div:nth-child(1)").eq(21).text();
                return [dateTimezone, time];
            })
            .catch((err) => messg.catchError(userInput));

        // Search result and grab a random picture
        let pictureWebpage: Promise<string> = requestPage(picURL)
            .then((response) => {
                // Returns a Promise of picture URL
                let urls = response(".image a.link");
                let picture = urls.eq(getRandomInt(urls.length)).attr("href");
                if (!urls.length) return console.log("Can't get pictures");
                return picture;
            })
            .catch((err) => messg.catchError(userInput));

        // Wait for both pages to load
        await Promise.all([timeWebpage, pictureWebpage]).then(
            (res: [void | string[], string]) => {
                // Assemble embedded message
                try {
                    let embedded = new MessageEmbed()
                        .setColor(7268003)
                        .setTitle(argsString)
                        .addFields(
                            {
                                name: res[0],
                                value: res[0][1],
                            },
                            {
                                name: "Date:",
                                value: res[0][0],
                            }
                        )
                        .setImage(res[1])
                        .setThumbnail(thumbnails[0])
                        .addField(empty, githubMessage(this.cmnd_name))
                        .setFooter(footer.text, footer.icon_url);
                    // Send message
                    sendMessage(userInput, embedded, this.cmnd_name);
                } catch (error) {
                    messg.catchError(userInput);
                }
            }
        );
    }
}
