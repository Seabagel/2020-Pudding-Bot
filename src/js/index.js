// Dependencies
const Discord = require("discord.js");
const requestPromise = require("request-promise");

// Config files
const { token } = require("../../config/config.json");

// JSON files
const keywords = require("../json/keywords.json");

// Functions
const { sendGithub, sendTime } = require("./commands.js");
const { containsWord } = require("./func.js");

// Client
const client = new Discord.Client();
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (userInput) => {
    // Message content
    let message = userInput.content.toLowerCase(); // The chat message

    // Check if message is from itself
    if (userInput.author.bot) {
        return;
    } else if (message.startsWith("!time")) {
        // If message starts with command, then
        sendTime(userInput, "mongolia");
    } else if (
        containsWord(message, keywords.pudding) &&
        containsWord(message, keywords.github)
    ) {
        sendGithub();
    } else {
        // If nothing else, exit
        return;
    }

    // EOF
});

// Last line
client.login(token);
