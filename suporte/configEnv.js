require('dotenv').config();

module.exports={
    URLS: {
        ROTA_ENDPOINT: process.env.URL_ROTA
    },

    HEADERS: {
        API_TOKEN: { "token": "regdfdgfdgdfhdfhdf321" },
        CONTENT_TYPE: { "accept": "application/json" }
    }
}