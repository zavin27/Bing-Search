const express = require('express');
const verifyToken = require("../common/verifyToken");
const models = require('../models');
const Search = require('azure-cognitiveservices-search');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

const router = express.Router();

let credentials = new CognitiveServicesCredentials(process.env.AZURE_WEB_SEARCH_KEY);
let webSearchApiClient = new Search.WebSearchAPIClient(credentials);
/**
 * Search with Bing Web Search API
 * ENDPOINT: /search
 */
router.post('/', verifyToken, (req, res) => {
    webSearchApiClient.web.search(req.body.search)
        .then(result => {
            // res.status(200).json(result);
            models.SearchHistory.findOrCreate({where: {text: req.body.search, user_id: req.authData.user.id}})
                .then((data, created) => {
                    return res.status(200).json(result.webPages.value)
                });
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error)
        })
});

module.exports = router;
