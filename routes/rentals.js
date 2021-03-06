const validator = require('../middleware/validate')
const auth = require('../middleware/auth');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);


router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


router.post('/', [auth, validator(validate)], async(req, res) => {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid mustomer');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    const rental = new Rental({ 
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
        res.send(rental);
    } catch (ex) {
        res.status(500).send('Something failed.');
    }

});

router.put('/:id', [auth, validator(validate)], async(req, res) => {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid genre.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    const rental = Rental.findByIdAndUpdate(req.params.id, { 
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
    });
        
    if (!rental) return res.status(404).send(`There was no existing post associated with the given id`);

    res.send(rental);
});

router.delete('/:id', auth, async(req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);

    if (!rental) return res.status(404).send(`There was no existing post associated with the given id`);

    res.send(rental);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given id was not found');

    res.send(rental);
});

module.exports = router;