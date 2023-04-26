const express = require('express');
const router = express.Router();
 
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { spawn } = require('child_process');
const util = require('util');


const spawnAsync = util.promisify(spawn);


router.get('/', (req, res) => {
    res.status(200).send({
        message: 'File route is working.',
    });
});


router.post('/file', async (req, res) => {
	const graphType = req.body.type;
  
	const listString = JSON.stringify(req.body.countries);
  
	const pythonScript = spawn('python', ['../Database/generate_graph.py', listString, graphType]);

	const imagePath = path.join(__dirname, '../../Database/Pictures/co2_emission.png');

	pythonScript.on('close', (code) => {
		res.status(200).sendFile(imagePath);
	});
});

module.exports = router;