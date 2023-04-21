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
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email)
}

function ValidatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
    return passwordRegex.test(password)
  }

router.post('/register', async (req, res) => {
    const body = req.body;

    if (/*!body.username || !body.email || !body.password || !body.confirmPassword ||*/ body.username === '' || body.email === '' || body.password === '' || body.confirmPassword !== '' || body.acceptsTermsAndCoditions === false) {
        res.status(400);
        res.send({
          message: "Please fill all fields and accept Terms and Conditions.",
          body
        });
        
        return;
    }

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

    if (!ValidatePassword(body.password)) {
        res.status(400);
        res.send({
          message: "The password must have a minimum of 8 characters and contain upper and lower case letters",
        });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    const result = await collection.insertOne({

        username: body.username,
        email: body.email,
        password: passwordHash,
        dob: body.dob,
        acceptsTermsAndCoditions: body.acceptsTermsAndCoditions
    
    });

    res.status(201).send({
        status: 'Success.',
        result
    });
});

router.post('/login', (req, res) => {
    
});

module.exports = router;