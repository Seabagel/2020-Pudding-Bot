// Dependencies
const Discord = require("discord.js");
const requestPromise = require("request-promise");

// Config files
const { token } = require("../../config/config.json");

// JSON files
const keywords = require("../json/keywords.json");
const prefix = "pudding";

// Functions
const { sendGithub, sendTime, sendBible } = require("./commands.js");

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
    if (userInput.author.bot) return;

    // If message starts with command, then
    if (message.startsWith(prefix + " -time")) {
        const args = message
            .slice((prefix + " -time").length)
            .trim()
            .split(" ");

        // run command
        sendTime(userInput, args);
    } else if (message.startsWith(prefix + " -help")) {
        sendGithub(userInput);
    } else if (message.startsWith(prefix + " -preach")) {
        sendBible(userInput);
    } else {
        // If nothing else, exit
        return;
    }

    // EOF
});

// Last line
client.login(token);
