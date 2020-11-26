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

let help_command: command = {
    cmnd_name: "help",
    async execute() {},
};

export class command_time implements command {
    cmnd_name = "help";
    async execute(userInput, args) {
        try {
            // Assemble embedded message
            const embedded = new MessageEmbed()
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
                .addField(empty, mssg_tools.github(this.cmnd_name))
                .setFooter(footer.text, footer.icon_url);

            // Send message
            mssg_tools.send(userInput, embedded, this.cmnd_name);
        } catch (error) {
            mssg_tools.catchError(userInput);
        }
    }
}
