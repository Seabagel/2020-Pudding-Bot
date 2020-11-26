export const text_tools = {
    capitalize: async (str) => {
        if (typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    },
    containsWord: async (message, wordList) => {
        for (let i = 0; i < wordList.length; i++) {
            if (message.includes(wordList[i])) {
                return true;
            }
        }
    },
    getRandomInt: async (max) => {
        return Math.round(Math.random() * max);
    },
};
