// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// express
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, console.log(`MongoDB connected. Server is listening to port:${PORT}`)))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
