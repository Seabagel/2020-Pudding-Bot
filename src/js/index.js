// Dependencies
const Discord = require("discord.js");

// Functions
const { mentionsKeyword, containsWord, getAPI } = require("./fn.js");

// Config files
const { token, keywords, commonWords } = require("../../config/config.json");

// Client
const client = new Discord.Client();

// Ready message
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (userInput) => {
    // Message content
    let message = userInput.content.toLowerCase(); // The chat message

    // Check if message contains keyword
    if (!mentionsKeyword(keywords, message) || userInput.author.bot) return;

    containsWord(message, ["help", "github", "source", "code"], () => {
        let text =
            "https://github.com/Seabagel/discord.js-VirtualPudding/tree/timezones";
        userInput.channel.send(text);
    });

    // EOF
});

// Last line
client.login(token);
