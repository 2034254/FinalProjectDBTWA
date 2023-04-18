const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server is running.',
    })
});

app.listen(8080, () => {
    console.log('Server listening on port 8080.')
});