/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(set) {
    const joi = Joi.object({ name: Joi.string().min(3).required() });
    return joi.validate(set);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenres;