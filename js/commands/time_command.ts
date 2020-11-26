// Dependencies
import { MessageEmbed } from "discord.js";
import cheerio from "cheerio";

// JSON
import { empty, footer, thumbnails } from "../tools/~templates.json";

// Functions
import { mssg_tools } from "../tools/message_tool";
import { htttp_tools } from "../tools/http_tool";
import { text_tools } from "../tools/text_tool";

// Interface
import { command } from "../interfaces/command";

export class command_time implements command {
    cmnd_name = "time";
    async execute(userInput, args) {
        let argsURL = args.join("+");
        let argsString = text_tools.capitalize(args.join(" "));

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
        let timeWebpage: Promise<void | string[]> = htttp_tools
            .requestPage(timeURL)
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
            .catch((err) => mssg_tools.catchError(userInput));

        // Search result and grab a random picture
        let pictureWebpage: Promise<string> = htttp_tools
            .requestPage(picURL)
            .then((response) => {
                // Returns a Promise of picture URL
                let urls = response(".image a.link");
                let picture = urls
                    .eq(text_tools.getRandomInt(urls.length))
                    .attr("href");
                if (!urls.length) return console.log("Can't get pictures");
                return picture;
            })
            .catch((err) => mssg_tools.catchError(userInput));

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
                        .addField(empty, mssg_tools.github(this.cmnd_name))
                        .setFooter(footer.text, footer.icon_url);
                    // Send message
                    mssg_tools.send(userInput, embedded, this.cmnd_name);
                } catch (error) {
                    mssg_tools.catchError(userInput);
                }
            }
        );
    }
}
