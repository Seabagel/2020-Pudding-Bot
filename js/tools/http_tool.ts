import fetch from "node-fetch";
import requestPromise from "request-promise";

export const htttp_tools = {
    fetchAPI: async (url) => {
        let response = await fetch(url);
        return await response.json();
    },
    requestPage: async (url) => {
        return await requestPromise(url)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
