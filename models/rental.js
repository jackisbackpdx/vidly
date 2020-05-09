const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { movieSchema } = require('./movie');
const { customerSchema } = require('./customer');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true,
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    } 
});

function validateRental(rental) {
    
}

exports.rentalSchema = rentalSchema;