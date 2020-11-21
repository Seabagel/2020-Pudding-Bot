const fs = require("fs");
const Discord = require("discord.js");
const { token } = require("../../config/config.json");
const prefix = "pudding";

// Client
const client = new Discord.Client();
client.once("ready", () => {
    console.log("Ready!");
});

// Get commands dynamically
client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Activate on message event
client.on("message", async (userInput) => {
    if (!message.startsWith(prefix) || userInput.author.bot) return;

    const args = userInput.content
        .toLowerCase()
        .slice(prefix.length)
        .trim()
        .split(" ");
    const command = args[0];

    try {
        client.commands.get(command).execute(userInput, args.shift());
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }

    // if (command == "-time") sendTime(userInput, args);
    // else if (command == "-help") sendGithub(userInput);
    // else if (command == "-preach") sendBible(userInput);
});

client.login(token);
