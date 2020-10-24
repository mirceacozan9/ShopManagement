const express = require('express')
const router = express.Router()
const ShopInventoryModel = require('../models/ShopInventoryModel')

// Post request to add a user
router.post('/inventory', (req, res) => {
    if(!req.body)
    {
        return res.status(400).send('Request user body is missing!');
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

// Get request for all users
router.get('/inventory', (req,res) =>{
    ShopInventoryModel.find()
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;