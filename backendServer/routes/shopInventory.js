const express = require('express')
const router = express.Router()
const ShopInventoryModel = require('../models/ShopInventoryModel')

// Post request to add an item to the inventory db
router.post('/inventory', (req, res) => {
    if(!req.body)
    {
        return res.status(400).send('Request item JSON body is missing!');
    }

    let model = new ShopInventoryModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            else{
                res.status(201).send(doc)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

// Get request for all Items in inventory
router.get('/inventory', async (req,res) =>{
    try {
        const getAll = await ShopInventoryModel.find()
        res.json(getAll);
    } catch (err) {
        res.status(500).json({message:err});
    }
})

// Get request by the barcode for an item in the db
router.get('/inventory/:idParamGet', async (req,res) =>{
    try {
        const getById = await ShopInventoryModel.find({ Barcode: req.params.idParamGet });
        res.json(getById);
    } catch (err) {
        res.status(500).json({message:err});
    }
});

// Delete all instances of a specific product by the ID
router.delete('/inventory/:idParamDelete', async (req, res) => {
    try{
        const removeAllItems = await ShopInventoryModel.deleteOne({ Barcode: req.params.idParamDelete });
        res.json(removeAllItems);
    } catch(err) {
        res.status(500).json({message:err});
    }
});

// Update a product
router.patch('/inventory/:idParamUpdate', async (req, res) => {
    try{
        const updateItem = await ShopInventoryModel.updateOne({Barcode: req.params.idParamUpdate}, 
            {$set: {Name: req.body.Name, Quantity: req.body.Quantity, Price: req.body.Price}});
        res.json(updateItem);
    } catch(err) {
        res.status(500).json({message:err});
    }
})

module.exports = router;