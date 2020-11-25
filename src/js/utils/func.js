const fetch = require("node-fetch");
const requestPromise = require("request-promise");
const { githubURL, errorMsg } = require("../../json/templates.json");

const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
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
    return await requestPromise(url)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

const sendMessage = async (userInput, embedded, commandName) => {
    try {
        userInput.channel.send(embedded);
        console.log("Sending message... " + commandName);
    } catch (err) {
        console.log("Error: " + err);
    }
};

const githubMessage = (cmdName) => {
    return `**Command:** [pudding *-${cmdName}*](${githubURL})`;
};

const getRandomInt = (max) => {
    return Math.round(Math.random() * max);
};

let catchRespond = (userInput) => {
    console.log(errorMsg[0]);
    userInput.channel.send(errorMsg[0]);
    userInput.channel.send(errorMsg[1]);
};

module.exports = {
    capitalize,
    containsWord,
    fetchAPI,
    requestPage,
    sendMessage,
    githubMessage,
    getRandomInt,
    catchRespond,
};
