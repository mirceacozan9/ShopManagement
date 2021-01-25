const express = require('express');
// Create the express application 
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// Import Routes
const postTestingRoute = require('./routes/postTesting');
const userCredentialsRoute = require('./routes/userCredentials');
const shopInventoryRoute = require('./routes/shopInventory');
const excelExportRoute = require('./routes/excelExport');

app.use(bodyParser.json());

// Testing shit
app.use('/posts', postTestingRoute); 
app.get('/', (req,res) => {
    res.send('WE ARE ON HOME');
});


app.use(userCredentialsRoute);
app.use(shopInventoryRoute);
app.use(excelExportRoute);
app.use(cors());

// Connect to db
// Mongo Atlas user: alexandru.balazs99@e-uvt.ro
// Mongo Atlas password: MongoTest888
mongoose.connect(process.env.DB_CONNECTION_LINK, 
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true },
     () => console.log('Connected to MongoDB!')
);

// Start listening to the server
app.listen(8080);
