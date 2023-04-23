const express = require('express');
const router = express.Router();
 
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);


router.get('/', (req, res) => {
    res.status(200).send({
        message: 'File route is working.',
    });
});


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






module.exports = router;