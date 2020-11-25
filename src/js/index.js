// Dependencies
const fs = require("fs");
const Discord = require("discord.js");

// JSON
const { token } = require("../../config/config.json");
const { prefix } = require("../json/templates.json");

// Functions
const { catchRespond } = require("./utils/func.js");

// Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Get commands dynamically
const commandFiles = fs
    .readdirSync("./src/js/commands")
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });

// Ready message
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (userInput) => {
    let message = userInput.content.replace(/[^a-zA-Z ]/g, "").toLowerCase();

    if (!message.startsWith(prefix) || userInput.author.bot) return;

    const args = message.slice(prefix.length).trim().split(" ");
    const command = args.shift();

    try {
        client.commands.get(command).execute(userInput, args);
    } catch (error) {
        catchRespond(userInput);
    }
});

client.login(token);
