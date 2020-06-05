const validator = require('../middleware/validate');
const auth = require('../middleware/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', [auth, validator(validate)], async(req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.send(customer);
});

router.put('/:id', [auth, validator(validate)], async(req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    if (!customer) return res.status(404).send('No customer with the matching id was found');

    res.send(customer);
});

router.delete('/:id', auth, async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('No customer with the matching id was found');

    res.send(customer);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('No customer with the matching id was found');

    res.send(customer);
});

module.exports = router;