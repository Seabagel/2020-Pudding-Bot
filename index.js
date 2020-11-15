// Dependencies
const Discord = require("discord.js");
const fetch = require("node-fetch");

// Client/Token
const client = new Discord.Client();
const { token } = require("./config.json");

// Variables
const dictionary = require("./dictionary");
const keywords = ["pudding", "pudd", "pud"];

// Ready message
client.once("ready", () => {
    console.log("Ready!");
});

// Activate on message event
client.on("message", async (message) => {
    // variables
    let pass = false;
    let chat = message.content.toLowerCase(); // The chat message

    // Check if it contains keywords
    for (let i = 0; i < keywords.length; i++) {
        if (chat.includes(keywords[i])) {
            pass = true;
            break;
        }
    }

    // If contain keywords, continue
    if (!pass || message.author.bot) return;
    else {
        // Look for dictionary words that matches
        for (let i = 0; i < dictionary.length; i++) {
            if (chat.includes(dictionary[i])) {
                // Concat the resulting bible verse
                getBibleVerse().then((result) => {
                    const text = `${capitalize(result[0].text)}, *${
                        result[0].bookname
                    } - ${result[0].chapter}:${result[0].verse}*`;
                    // Send a message
                    message.channel.send(text);
                });
                // Break from loop
                break;
            }
        }
    }
    // EOF
});

// Functions
async function getBibleVerse() {
    let response = await fetch(
        "https://labs.bible.org/api/?passage=random&type=json"
    );
    let result = await response.json();
    return result;
}

const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

// Last line
client.login(token);

// Test github
