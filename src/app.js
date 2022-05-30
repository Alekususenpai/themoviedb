const { searchAllMovies, searchAllTVseries, getMovieDetails, getSerieDetails, getTrendingMovies, getTrendingSeries } = require('./controllers/movies')
const STATUS_CODE = require('./util/status-codes');

const express = require('express');
const app = express();


// MIDDLEWARE

var morgan = require('morgan');
var helmet = require('helmet');
const { parse } = require('dotenv');

//green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));


// ROUTES

app.get('/', function (req, res) {
          res.status(STATUS_CODE.OK).send('Welcome to the homepage!')
})

app.get('/trendingmovies', getTrendingMovies);

app.get('/trendingseries', getTrendingSeries);

app.get('/movies', searchAllMovies);

app.get('/movie/:id', getMovieDetails);

app.get('/series', searchAllTVseries);

app.get('/serie/:id', getSerieDetails);


let msg = 'Page not found. Please try one of the following end points: /trendingmovies; /trending series; /movies; /series;'


app.get('*', function (req, res) {
          res.status(STATUS_CODE.NOT_FOUND).send(msg);
})


module.exports = app;