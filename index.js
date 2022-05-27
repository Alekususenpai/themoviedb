const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


const port = 3000;

app.listen(port, () => {
          console.log(`listening on port ${port}`)
})


const searchAllMovies = async (searchTerm) => {
          try {
                    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}`)
                    console.log(res.data)
          }


          catch (e) {
                    console.log('Error in searching all movies!', e)
          }
}

searchAllMovies('strange')


const getMovieDetails = async (movieId) => {
          try {
                    const res = await axios.get(`http://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&append_to_response=videos`)
                    const key = res.data.videos.results[3].key;
                    console.log('Key:', key);

                    const watchTrailer = (key) => {
                              const linkToTrailer = `https://www.youtube.com/watch?v=${key}`;
                              console.log('Link to trailer:', linkToTrailer)

                    }
                    watchTrailer(key);
          }
          catch (e) {
                    console.log('Error in fetching movie details!', e)
          }
}

getMovieDetails('157336')


const searchAllTVseries = async (searchTerm) => {
          try {
                    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`)
                    console.log(res.data)
          }


          catch (e) {
                    console.log('Error in searching all series!', e)
          }
}


