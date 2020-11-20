const Discord = require("discord.js");
const { token } = require("../../config/config.json");
const { sendGithub, sendTime, sendBible } = require("./commands.js");
const prefix = "pudding";

// Client
const client = new Discord.Client();
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (userInput) => {
    let message = userInput.content.toLowerCase();

    if (userInput.author.bot) return;
    if (message.startsWith(prefix)) {
        const args = message.slice(prefix.length).trim().split(" ");
        if (args[0] == "-time") {
            let args = args.shift();
            sendTime(userInput, args);
        } else if (args[0] == "-help") {
            sendGithub(userInput);
        } else if (args[0] == "-preach") {
            sendBible(userInput);
        }
    } else return;
});

client.login(token);
