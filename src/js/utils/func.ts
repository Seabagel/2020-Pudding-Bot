import fetch from "node-fetch";
const requestPromise = require("request-promise");

export const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const containsWord = (message, wordList) => {
    for (let i = 0; i < wordList.length; i++) {
        if (message.includes(wordList[i])) {
            return true;
        }
    }
};

export const fetchAPI = async (url) => {
    let response = await fetch(url);
    return await response.json();
};

export const requestPage = async (url) => {
    return await requestPromise(url)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getRandomInt = (max) => {
    return Math.round(Math.random() * max);
};
