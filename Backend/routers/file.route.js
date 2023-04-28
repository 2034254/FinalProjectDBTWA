const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const router = express.Router();

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
	pythonScript.stderr.on('data', (data) => {console.log(`Errror $(data)`);})
	pythonScript.on('close', (code) => {
		res.status(200).sendFile(imagePath);
	});
});

module.exports = router;