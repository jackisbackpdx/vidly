const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();
const { getDate } = require('../commons/date');


router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('name');
    res.send(rentals);
});


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const date = getDate();

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid genre.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    let rental = new Rental({ 
        movie: {
            _id: movie._id,
            title: movie.title,
            genre: {
                _id: movie.genre._id,
                name: movie.genre.name,
            },
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
        checkoutDate: date.fullDate,
        dueDate: date.nextWeek
    });

    rental = await rental.save();
    res.send(rental);
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const date = getDate();

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid genre.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    let rental = new Rental({ 
        movie: {
            _id: movie._id,
            title: movie.title,
            genre: {
                _id: movie.genre._id,
                name: movie.genre.name,
            },
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
        checkoutDate: date.fullDate,
        dueDate: date.nextWeek
    });
        
    if (!rental) return res.status(404).send(`There was no existing post associated with the given id`);

    res.send(rental);
});

router.delete('/:id', async(req, res) => {
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