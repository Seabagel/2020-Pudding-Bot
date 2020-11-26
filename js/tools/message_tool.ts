// JSON
import { Message, MessageEmbed } from "discord.js";
import { githubURL, errorMsg } from "./~templates.json";

export const mssg_tools = {
    github: (cmdName: string) => {
        return `**Command:** [pudding *-${cmdName}*](${githubURL})`;
    },
    send: async (userInput: Message, embedded: MessageEmbed, commandName) => {
        try {
            userInput.channel.send(embedded);
            console.log("Sending message... " + commandName);
        } catch (err) {
            console.log("Error: " + err);
        }
    },
    catchError: (userInput: Message) => {
        console.log(errorMsg[0]);
        userInput.channel.send(errorMsg[0]);
        userInput.channel.send(errorMsg[1]);
    },
};
