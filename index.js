const { searchAllMovies, searchAllTVseries, getMovieDetails, getSerieDetails, getTrendingMovies, getTrendingSeries } = require('./handlers/movies')
const STATUS_CODE = require('./util/status-codes');

const express = require('express');
const app = express();

var morgan = require('morgan');
var helmet = require('helmet');

require('dotenv').config();


// MIDDLEWARE
//green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));

const port = 3000;


app.listen(port, (e) => {
          if (e) {
                    console.error(e);
                    return;
          }
          console.log(`Listening on port ${port}`)
})

// ROUTES

app.get('/', function (req, res) {
          res.status(STATUS_CODE.OK).send('Welcome to the homepage!')
})

app.get('/trendingMovies', getTrendingMovies);

app.get('/trendingSeries', getTrendingSeries);

app.get('/movies', searchAllMovies);

app.get('/movie/:id', getMovieDetails);

app.get('/series', searchAllTVseries);

app.get('/serie/:id', getSerieDetails);



app.get('*', function (req, res) {
          res.send('No such route!')
})
