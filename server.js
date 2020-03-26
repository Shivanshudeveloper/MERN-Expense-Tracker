const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');


// DB Connection
const db = require('./config/keys').MongoURI;
// Connect MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('MongoDB Connected') )
    .catch(err => console.log(err));

const transactions = require('./routes/transactions');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);


// If the App is in Production Server
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));