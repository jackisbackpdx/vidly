const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const genres = [
    { id: 1, genre: 'Horror' },
    { id: 2, genre: 'Action' },
    { id: 3, genre: 'Romance' },
    { id: 4, genre: 'Comedy' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const { error } = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body
    };
    genres.push(genre);
    res.send(genres);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c === req.params.id);
    if(!genre) return res.status(404).send(`There was no existing post associated with the given id`);

    const { error } = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c === req.params.id);
    if(!genre) return res.status(404).send(`There was no existing post associated with the given id`);

    const { error } = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres);
});

function validateGenres(set) {
    const joi = Joi.object({ genre: Joi.string().min(3).required() });
    return joi.validate(set);
}

module.exports = router;