const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const path = require('path');
const { spawn } = require('child_process');
const { client } = require('../database/database.js');

const router = express.Router();

const database = client.db('finalproject');
const collection = database.collection('users');

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
	const graph = req.body.graph;

	const decodedToken = jwt_decode(token);

	const username = decodedToken.username;

	const filter = {username: username}
	const update = { $set: { graph: graph} };
	
	try {		
		const result = await collection.updateOne(filter, update);
		console.log(`${result.modifiedCount} document(s) updated`);
		res.status(200).send({
			message: 'Success.',
		});
	} catch {
		res.status(400).send({
			message: 'Something went wrong.'
		});
	}
});

module.exports = router;