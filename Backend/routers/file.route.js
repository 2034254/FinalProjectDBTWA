const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const path = require('path');
const { spawn } = require('child_process');
const { client } = require('../database/database.js');

const router = express.Router();

const database = client.db('finalproject');
const userCollection = database.collection('users');
const graphCollection = database.collection('graphs');

router.get('/', (req, res) => {
    res.status(200).send({
        message: 'File route is working.',
    });
});

router.post('/file', async (req, res) => {
	const graphType = req.body.graphType;
  
	const listString = JSON.stringify(req.body.countries);
  
	const pythonScript = spawn('python', ['../Database/generate_graph.py', listString, graphType]);

	const imagePath = path.join(__dirname, `../../Database/Pictures/${graphType}.png`);
	pythonScript.stderr.on('data', (data) => {
		console.log(`Errror $(data)`);
	});
	pythonScript.on('close', (code) => {
		res.status(200).sendFile(imagePath);
	});
});

router.post('/save', async (req, res) => {
	const token = req.headers.authorization;
	const body = req.body;

	const decodedToken = jwt_decode(token);

	const userId = decodedToken.userId;
	
	const result = await graphCollection.insertOne({
		userId: userId,
        name: body.name,
        countries: body.countries,
        graphType: body.graphType,
		date: body.date
    });

	res.status(201).send({
        message: 'Success.'
    });
});

module.exports = router;