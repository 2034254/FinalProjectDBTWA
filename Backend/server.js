const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth.route');

const app = express();

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server is running.',
    })
});

app.listen(8080, () => {
    console.log('Server listening on port 8080.')
});