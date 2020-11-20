const fetch = require("node-fetch");
const requestPromise = require("request-promise");

const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const containsWord = (message, wordList) => {
    for (let i = 0; i < wordList.length; i++) {
        if (message.includes(wordList[i])) {
            return true;
        }
    }
};

const fetchAPI = async (url) => {
    let response = await fetch(url);
    return await response.json();
};

const requestPage = async (url) => {
    let result = await requestPromise(url)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });

    return await result;
};

const sendMessage = async (userInput, embedded, commandName) => {
    try {
        userInput.channel.send({ embed: embedded });
        console.log("Sending message... " + commandName);
    } catch (error) {
        console.log("Error: " + error);
    }
};

module.exports = {
    capitalize,
    containsWord,
    fetchAPI,
    requestPage,
    sendMessage,
};
