const fetch = require("node-fetch");

// Functions
const getAPI = async (handleAPI) => {
    let response = await fetch(handleAPI.url);
    let result = await response.json();
    return result.then(handleAPI.func);
};

const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Look for dictionary words that matches
const containsWord = (message, wordList, callback) => {
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].includes(message)) {
            // Break from loop
            callback();
            break;
        }
    }
};

const mentionsKeyword = (keywords, message) => {
    let passed = false;
    keywords.forEach((index) => {
        if (message.includes(index)) {
            passed = true;
            console.log("For loop break");
        }
    });
    return passed;
};

module.exports = {
    getAPI,
    capitalize,
    containsWord,
    mentionsKeyword,
};
