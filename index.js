const { searchAllMovies, searchAllTVseries, getMovieDetails, getSerieDetails, getTrending } = require("./handlers/movies")
const STATUS_CODE = require("../util/status-codes");

const express = require('express');
const app = express();

const axios = require('axios');
var morgan = require('morgan');
var helmet = require('helmet');

require('dotenv').config();


// MIDDLEWARE
app.use(morgan('dev'));
app.use(helmet());


const port = 3000;


app.listen(port, (err) => {
          if (e) {
                    console.error(e);
                    return;
          }
          console.log(`Listening on port ${port}`)
})

// ROUTES

app.get('/', function (req, res) {
          res.status(STATUS_CODE.OK).send('hi!')
})

api.get("/trending", getTrending);

api.get("/movies", searchAllMovies);

api.get("/movies/:id", getMovieDetails);

api.get("/series", searchAllTVseries);

api.get("/series/:id", getSerieDetails);



app.get('*', function (req, res) {
          res.status(STATUS_CODE.OK).send('No such route!')
})
