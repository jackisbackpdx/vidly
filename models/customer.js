const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
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
        maxlength: 10,
        required: true
    }
});

const Customer = mongoose.model('Customer', );

function validateCustomers(customer) {
    const joi = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(20).required(),
        phone: Joi.string().min(10).max(10).required()
    });

    return joi.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomers;
exports.customerSchema = customerSchema;