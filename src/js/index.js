const Discord = require("discord.js");
const { token } = require("../../config/config.json");
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
    let message = userInput.content.toLowerCase(); // The chat message

    if (userInput.author.bot) return;

    if (message.startsWith(prefix + " -time")) {
        const args = message
            .slice((prefix + " -time").length)
            .trim()
            .split(" ");
        sendTime(userInput, args);
    } else if (message.startsWith(prefix + " -help")) {
        sendGithub(userInput);
    } else if (message.startsWith(prefix + " -preach")) {
        sendBible(userInput);
    } else {
        return;
    }
});

// Last line
client.login(token);
