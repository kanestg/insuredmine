const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Setting port
const port = process.env.port || 3000;
app.use(cors())
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));

// Mongodb configuratrion
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('Database Connected at: ', process.env.MONGO_URI);
}).catch(err => {
    console.log('Error while connecting to database!', err);
});
mongoose.set('runValidators', true);

// Load our routes and pass in our app
app.use('/api', require('./routes/routes.js'));

// Listening to the port
app.listen(port, (err, result) => {
    if (err) console.log('Error while starting the server..!!');
    else console.log('APP server started on: ' + port);
});