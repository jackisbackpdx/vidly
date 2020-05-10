const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

app.listen(2000, () => console.log('Listening on port 2000'));