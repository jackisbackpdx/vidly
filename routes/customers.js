const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/Joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        required: true,
        type: Boolean,
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 20,
        required: true
    }
}));

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async(req, res) => {
    const customer = new Customer(req.body);
    const result = await customer.save();
    res.send(result);
});

module.exports = router;