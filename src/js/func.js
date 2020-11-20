// Requires
const fetch = require("node-fetch");
const requestPromise = require("request-promise");

// Capitalize sentence
const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Look for dictionary words that matches
const containsWord = (message, wordList) => {
    for (let i = 0; i < wordList.length; i++) {
        if (message.includes(wordList[i])) {
            // Break from loop
            return true;
        }
    }
};

// Fetch API
const fetchAPI = async (url) => {
    let response = await fetch(url);
    return await response.json();
};

// Request a webpage
let requestPage = async (url) => {
    let result = await requestPromise(url)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });

    return await result;
};

module.exports = {
    capitalize,
    containsWord,
    fetchAPI,
    requestPage,
};
