const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { client } = require('../database/database');

const router = express.Router();

const database = client.db('finalproject');
const collection = database.collection('users')

router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Auth route is working.',
    });
});

function ValidateEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email)
}

router.post('/register', async (req, res) => {
    const body = req.body;

    const email = await collection.findOne({
        email: body.email,
    });

    if (email) {
        res.status(400).send({
            message: 'Email already in use.'
        });

        return
    }

    if (!ValidateEmail(body.email)) {

        res.status(400).send({
            message: "Invalid email address."
        });
    
        return;
    
      }

    const username = await collection.findOne({
        username: body.username,
    });

    if (username) {
        res.status(400).send({
            message: 'Username already in use.'
        });

        return
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(body.password, salt);

        const result = await collection.insertOne({

            username: body.username,
            email: body.email,
            password: passwordHash,
            dateOfBirth: body.dateOfBirth,
            acceptsTermsAndCoditions: body.acceptsTermsAndCoditions
        
        });

        res.status(201).send({
            status: 'Success.',
            result
        });
    } catch {
        res.status(400).send({
            status: "Failed"
        });
    }
});

router.post('/login', (req, res) => {

});

module.exports = router;