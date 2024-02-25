const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes from routes/index.js
const router = require('./route/router.js');



// Initialize express
const app = express();

app.use(cors());

// Parses the json data from request body
app.use(express.json());

// Parses the query params from request url
app.use(express.urlencoded({ extended: true }));

// Uses imported routes in express
app.use('/', router);

mongoose.connect("mongodb://localhost:27017/UsernamePassword")
  .then(() => {
      console.log('Database connected');
  })
  .catch((err) => {
      console.log(err);
  });

// Listen web requests on 8000 port


const port = 8000;
app.listen(port, () => {
    console.log('App listening on port localhost',port);
});