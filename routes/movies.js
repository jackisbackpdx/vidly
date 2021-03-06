const validator = require('../middleware/validate')
const auth = require('../middleware/auth');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', [auth, validator(validate)], async(req, res) => {
    const genre = await Genre.findById(req.body.genreId);

    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();

    res.send(movie);
});

router.put('/:id', [auth, validator(validate)], async(req, res) => {
    const genre = await Genre.findById(req.body.genreId);

    if (!genre) return res.status(404).send('No genre with the given id was found');

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        rentalFee: req.body.rentalFee
    }, {
        new: true
    });

    if (!movie) return res.status(404).send(`There was no existing post associated with the given id`);

    res.send(movie);
});

router.delete('/:id', auth, async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send(`There was no existing post associated with the given id`);

    res.send(movie);
});

router.get('/:id', async(req, res) => {
    const genre = await Movie.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);
});

module.exports = router;