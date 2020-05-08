const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenres(set) {
    const joi = Joi.object({ name: Joi.string().min(3).required() });
    return joi.validate(set);
}

exports.Genre = Genre;
exports.validate = validateGenres;