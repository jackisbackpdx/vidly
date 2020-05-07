const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);

app.listen(2000, () => console.log('Listening on port 2000'));