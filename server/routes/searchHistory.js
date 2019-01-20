const express = require('express');
const verifyToken = require("../common/verifyToken");
const models = require('../models');

const router = express.Router();
/**
 * get a list of recently searched values
 * ENDPOINT: /search-history
 */
router.get('/', verifyToken, (req, res) => {
    models.SearchHistory.findAll({where: {user_id: req.authData.user.id}, limit: 10, order: [['updated_at', 'DESC']]})
        .then(result => {
            return res.status(200).json(result.map(item => (item.text)))
        })
        .catch(error => {
            return res.status(400).json(error)
        })
});

module.exports = router;
