require('dotenv').config();

module.exports={
    URLS: {
        ENDPOINT_USERS: process.env.URL_USERS
    },

    HEADERS: {
        API_TOKEN: { "token": "regdfdgfdgdfhdfhdf321" },
        CONTENT_TYPE: { "accept": "application/json" }
    }
}