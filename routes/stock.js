const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Stock,validate} = require('../models/stock');
const express = require('express');
const router = express.Router();



router.get('/', async(req,res)=>{
    const stocks = await Stock.find();

    // const stocks = await Stock.aggregate([
    //     {$group : {
    //         _id: "$name",
    //         quantity: {$sum: "$quantity"} 
    //     }}
    // ])
    
    res.send(stocks);    
});
router.post('/', async(req, res) =>{
       // Validate
    const {error} = validate(req.body);
    if(error){
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);        
    }

    const stock =new Stock({        
        name: req.body.name,
        quantity: req.body.quantity
    });
    await stock.save();
    res.send(stock);

});
router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
        
    const oldStock = await Stock.findOne();
    const newStockQuantity = parseFloat(oldStock.quantity)  + parseFloat(req.body.quantity);
    console.log(newStockQuantity);

    const stock = await Stock.findByIdAndUpdate(req.params.id,{
        quantity: newStockQuantity
    },{new: true});
  
    if(!stock)
        return res.status(404).send('The stock with the given ID not found.');

    res.send(stock);
});
router.delete('/:id',[auth,admin],async (req, res)=>{
    const stock = await Stock.findByIdAndRemove(req.params.id);
    if(!stock)
        return  res.status(404).send('The Stock with the given ID not found.');

    res.send(stock);
});
router.get('/:id',async (req,res)=>{
    const stock = await Stock.findById(req.params.id);
    if(!course)
        return res.status(404).send('The stock with the given ID not found.');
    res.send(stock);
});

module.exports = router;
