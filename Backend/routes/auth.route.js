const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Auth route is working.',
    });
});

router.post('/register', (req, res) => {

});

module.exports = router;