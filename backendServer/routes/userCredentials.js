const express = require('express')
const router = express.Router()
const UserCredentialModel = require('../models/UserCredentialsModel')

// Post request to add a user
router.post('/user', (req, res) => {
    if(!req.body)
    {
        return res.status(400).send('Request user body is missing!');
    }

    let model = new UserCredentialModel(req.body)
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

// Get request for all users in the users db
router.get('/user', async (req,res) =>{
    try {
        const getAll = await UserCredentialModel.find()
        res.json(getAll);
    } catch (err) {
        res.status(500).json({message:err});
    }
})

// Get request by the user ID for an user in the db
router.get('/user/:idParamGet', async (req,res) =>{
    try {
        const getById = await UserCredentialModel.find({ User_Id: req.params.idParamGet });
        res.json(getById);
    } catch (err) {
        res.status(500).json({message:err});
    }
});

// Delete the user with the given ID
router.delete('/user/:idParamDelete', async (req, res) => {
    try{
        const removeAllItems = await UserCredentialModel.deleteOne({ User_Id: req.params.idParamDelete });
        res.json(removeAllItems);
    } catch(err) {
        res.status(500).json({message:err});
    }
});

// Update an User
router.patch('/user/:idParamUpdate', async (req, res) => {
    try{
        const updateItem = await UserCredentialModel.updateOne({User_Id: req.params.idParamUpdate}, 
            {$set: {Firstname: req.body.Firstname, Lastname: req.body.Lastname, Password: req.body.Password}});
        res.json(updateItem);
    } catch(err) {
        res.status(500).json({message:err});
    }
})

module.exports = router;