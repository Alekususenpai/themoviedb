const STATUS_CODE = require('../util/status-codes');
const axios = require('axios');

const query = 'stranger';
const page = 1;
const language = 'en-EN';

//MOVIES
const searchAllMovies = async (req, res) => {
          try {
                    let movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&page=${page}&language=${language}`)
                    let totalpg = movies.data.total_pages;
                    if (movies.data.results.length !== 0) {
                              res.status(STATUS_CODE.OK).send(movies.data);
                    } else {
                              res.send(`Page ${page} not found. Total number of pages is ${totalpg}.`)
                    }
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.NOT_FOUND).send('Movies not found. Please try again later');
          }
}



const getMovieDetails = async (req, res) => {
          try {
                    const { id } = req.params;
                    let movieDetails = await axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${language}&append_to_response=videos`)

                    if (movieDetails) {
                              try {
                                        let key = movieDetails.data.videos.results[0].key;
                                        let linkToTrailer = `https://www.youtube.com/watch?v=${key}`;
                                        console.log('Trailer:', linkToTrailer);

                              }
                              catch (e) {
                                        console.log('Trailer unavailable')
                              }
                    }
                    res.status(STATUS_CODE.OK).send(movieDetails.data);

          }
          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.NOT_FOUND).send(`No such movie found`);
          }
}


// SERIES
const searchAllTVseries = async (req, res) => {
          try {
                    let series = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=${language}&page=${page}&include_adult=false&query=${query}`)
                    let totalpg = series.data.total_pages;
                    if (series.data.results.length !== 0) {
                              res.status(STATUS_CODE.OK).send(series.data);
                    } else {
                              res.send(`Page ${page} not found. Total number of pages is ${totalpg}.`)
                    }

          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.NOT_FOUND).send('Series not found. Please try again later');
          }
}


const getSerieDetails = async (req, res) => {
          try {
                    const { id } = req.params;
                    let serieDetails = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&page=${page}&language=${language}`)

                    if (serieDetails) {
                              try {
                                        let serieVideos = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=87c9ee003b99c8f380fd32a86f4ac028`)
                                        let key = serieVideos.data.results[0].key;
                                        let linkToTrailer = `https://www.youtube.com/watch?v=${key}`;
                                        console.log('Trailer:', linkToTrailer);

                              }
                              catch (e) {
                                        console.log('Trailer unavailable')
                              }
                    }
                    res.status(STATUS_CODE.OK).send(serieDetails.data);
          }

          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.NOT_FOUND).send('No such serie was found');
          }
}

const getTrendingMovies = async (req, res) => {
          try {
                    let trendingMovies = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&page=${page}&language=${language}`)

                    res.status(STATUS_CODE.OK).send(trendingMovies.data);
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Encountered a problem. Please try again later');
          }
}

const getTrendingSeries = async (req, res) => {
          try {
                    let trendingSeries = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&page=${page}&language=${language}`)


                    res.status(STATUS_CODE.OK).send(trendingSeries.data);
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.NOT_FOUND).send('Encountered a problem. Please try again later');
          }
}


module.exports = { searchAllMovies, searchAllTVseries, getMovieDetails, getSerieDetails, getTrendingMovies, getTrendingSeries };