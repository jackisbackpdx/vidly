const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Rental = new mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean, 
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const joi = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
    return joi.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;