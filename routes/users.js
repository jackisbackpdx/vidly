const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, complexity } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const users = await User.find()
        .sort('name')
        .select('name email');
    res.send(users);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    const passwordValidate = complexity.validate(req.body.password);
    if (passwordValidate.error) return res.status(400).send(passwordValidate.error.details);

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();


    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;