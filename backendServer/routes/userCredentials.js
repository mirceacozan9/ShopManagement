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

// Get request for all users
router.get('/user', (req,res) =>{
    UserCredentialModel.find()
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;