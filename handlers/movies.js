const STATUS_CODE = require("../util/status-codes");

const searchTerm = 'hello';
const page = 1;
const language = 'en-US';
const movieId = 10;
const serieID = 93287;


//MOVIES
const searchAllMovies = async (req, res) => {
          try {
                    let movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&page=${page}&language=${language}`)

                    res.status(STATUS_CODE.OK).send(movies);
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(e);
          }
}



const getMovieDetails = async (req, res) => {
          try {
                    let movieDetails = await axios.get(`http://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&page=${page}&language=${language}&append_to_response=videos`)
                    const key = movieDetails.data.videos.results[3].key;
                    console.log('Movie key:', key);

                    watchTrailer = (key) => {
                              const linkToTrailer = `https://www.youtube.com/watch?v=${key}`;
                              console.log('Link to trailer:', linkToTrailer)

                    }
                    res.status(STATUS_CODE.OK).send(movieDetails);

          }
          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(e);
          }
}


// SERIES
const searchAllTVseries = async (req, res) => {
          try {
                    const series = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=${language}&page=${page}&include_adult=false&query=${searchTerm}`)
                    res.status(STATUS_CODE.OK).send(series);
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(e);
          }
}


const getSerieDetails = async (req, res) => {
          try {

                    const serieDetails = await axios.get(`https://api.themoviedb.org/3/tv/${serieID}?api_key=${process.env.API_KEY}&page=${page}&language=${language}`)
                    res.status(STATUS_CODE.OK).send(serieDetails);

                    watchTrailer = async (serieID) => {
                              const serieVideos = await axios.get(`https://api.themoviedb.org/3/tv/${serieID}/videos?api_key=87c9ee003b99c8f380fd32a86f4ac028&language=${language}`)
                              const key = serieVideos.results.key[0];

                              const linkToTrailer = `https://www.youtube.com/watch?v=${key}`;
                              console.log('Link to trailer:', linkToTrailer)

                    }
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(e);
          }
}

const getTrending = async (req, res) => {
          try {
                    let trendingMovies = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&page=${page}`)
                    let trendingSeries = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&page=${page}`)

                    res.status(STATUS_CODE.OK).send(trendingMovies, trendingSeries);
          }


          catch (e) {
                    console.log('[ERROR]', e);
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(e);
          }
}


module.exports = { searchAllMovies, searchAllTVseries, getMovieDetails, getSerieDetails, getTrending };