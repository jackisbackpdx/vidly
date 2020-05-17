require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwt not defined')
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

app.listen(2000, () => console.log('Listening on port 2000'));