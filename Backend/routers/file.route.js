const express = require('express');
const router = express.Router();
 
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
<<<<<<< HEAD
const { spawn } = require('child_process');
const util = require('util');


const spawnAsync = util.promisify(spawn);
=======
>>>>>>> 0753a4a782e4eee9505513896873aae928ee690c


router.get('/', (req, res) => {
    res.status(200).send({
        message: 'File route is working.',
    });
});


<<<<<<< HEAD
router.post('/file', async (req, res) => {
	const graphType = req.body.type;
  
	const listString = JSON.stringify(req.body.countries);
  
	const pythonScript = spawn('python', ['../Database/generate_graph.py', listString, graphType]);

	const imagePath = path.join(__dirname, '../../Database/Pictures/co2_emission.png');

	pythonScript.on('close', (code) => {
		res.status(200).sendFile(imagePath);
	});
});

=======
router.get('/file',async (req, res) => {


    try {
        const { stdout } = await exec('python ../Database/co2_emission.py');
        console.log(stdout);
        const imagePath = path.join(__dirname, '../../Database/Pictures/co2_emission.png');
  
        res.status(200).sendFile(imagePath);

      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
   
});






>>>>>>> 0753a4a782e4eee9505513896873aae928ee690c
module.exports = router;