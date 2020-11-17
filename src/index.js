// Dependencies
const Discord = require("discord.js");

// Functions
const { mentionsKeyword, containsWord, getAPI } = require("./fn.js");

// Config files
const { token, keywords, commonWords } = require("../config/config.json");

// Client
const client = new Discord.Client();

// Ready message
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (message) => {
    // Message content
    let message = message.content.toLowerCase(); // The chat message

    // Check if message contains keyword
    if (!mentionsKeyword(keywords, message) || message.author.bot) return;

    containsWord(commonWords, message, getAPI());

    // EOF
});

// Last line
client.login(token);
