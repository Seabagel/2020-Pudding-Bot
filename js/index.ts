// Dependencies
import fs from "fs";
import Discord, { Collection } from "discord.js";

// JSON
import { token } from "../config/config.json";
import { prefix } from "./tools/~templates.json";

// Functions
import { mssg_tools } from "./tools/message_tool";

// Client
const client = new Discord.Client();

// Get commands dynamically
fs.readdirSync("./src/js/commands")
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
        const command = require(`./commands/${file}`);
        // commands.set(command.name, command)
    });

// Ready message
client.once("ready", () => {
    console.log("Ready!");
});

const commands: Map<string, command> = new Map<string, command>();

interface command {
    name: string;
    execute: Function;
}

// Activate on message event
client.on("message", async (userInput) => {
    let message = userInput.content.replace(/[^a-zA-Z ]/g, "").toLowerCase();

    if (!message.startsWith(prefix) || userInput.author.bot) return;

    const args = message.slice(prefix.length).trim().split(" ");
    const cmnd = args.shift();

    try {
        // TODO: Create a "Command" class that implements execute

        commands.get(cmnd).execute(userInput, args);
    } catch (error) {
        mssg_tools.catchError(userInput);
    }
});

client.login(token);
