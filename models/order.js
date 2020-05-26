const mongoose = require('mongoose');
const Joi = require('joi');
const productSchema = require('./product');

const Order = mongoose.model('Order', new mongoose.Schema({
    saleprice: {type: Number},
    discount: {type: Number},
    product: {
        type: productSchema,
        required: true
    }
}));

function validateOrder(order){
    const schema = {
        productId: Joi.objectId().required()
    };
    return Joi.validate(order, schema);    
}

exports.Order = Order;
exports.validate = validateOrder;