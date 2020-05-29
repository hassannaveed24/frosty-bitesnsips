const auth = require('../middleware/auth');
const {Order,validate} = require('../models/order');
const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');


router.get('/',async(req,res)=>{
    const orders = await Order.find();
    res.send(orders);
});
router.post('/',auth, async(req, res) =>{
    // Validate
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const product = await Product.findById(req.body.productId);
    if(!product) 
        return res.status(400).send('Invalid product.');
    
    const order =new Order({        
        saleprice: req.body.saleprice,
        product: {
            _id: product._id,
            name: product.name,
            price: product.price
        },
        discount: req.body.discount
    });
    await order.save();
    res.send(order);

});
router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
        
    const order = await Order.findByIdAndUpdate(req.params.id,{
        saleprice: req.body.price
    },{new: true});
  
    if(!order)
        return res.status(404).send('The order with the given ID not found.');

    res.send(order);
});
router.delete('/:id',async (req, res)=>{
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order)
        return  res.status(404).send('The Order with the given ID not found.');

    res.send(order);
});
router.get('/:id',async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(!course)
        return res.status(404).send('The order with the given ID not found.');
    res.send(order);
});

module.exports = router;
