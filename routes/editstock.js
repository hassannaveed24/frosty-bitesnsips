const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Stock,validate} = require('../models/stock');
const express = require('express');
const router = express.Router();

router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const oldStock = await Stock.findOne();
    const newquantity = parseFloat(oldStock.quantity) + parseFloat(req.body.quantity);
    const stock = await Stock.findByIdAndUpdate(req.params.id,{
        quantity: newquantity
    },{new: true});
    
    if(!stock)
        return res.status(404).send('The stock with the given ID not found.');

    res.send(stock);
});

module.exports = router;
