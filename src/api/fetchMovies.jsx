
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=36aae46d872dddaed5df56cf6ef9643b';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not Found'));
}

//get list of the most popular movies for today
export function fetchTrendingMovies(page = '1') {
  const PATH_PARAMS = '/trending/movie/day';
  // return
  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${API_KEY}&page=${page}`
  );
}

//get search for a movie
export function fetchMovies(searchQuery, page = '1') {
  const PATH_PARAMS = '/search/movie';
  // eslint-disable-next-line
  const SEARCH_PARAMS = '&language=en-US&include_adult=false';

  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${API_KEY}&query=${searchQuery}&page=${page}`
  );
}

//get full movie info for the movie page
export function fetchMovieDetails(movie_id) {
  const PATH_PARAMS = '/movie/';
  const SEARCH_PARAMS = '&language=en-US';

  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${movie_id}${API_KEY}${SEARCH_PARAMS}`
  );
}

// get cast info for the movie page
export function fetchMovieCredits(movie_id) {
  const PATH_PARAMS = '/movie/';
  const SEARCH_PARAMS = '&language=en-US';

  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${movie_id}/credits${API_KEY}${SEARCH_PARAMS}`
  );
}

//get reviews for the movie page
export function fetchMovieReviews(movie_id, page = '1') {
  const PATH_PARAMS = '/movie/';
  const SEARCH_PARAMS = '&language=en-US&page=';

  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${movie_id}/reviews${API_KEY}${SEARCH_PARAMS}${page}`
  );
}

// const fetchMovies = ({ movieId }) => {
//     const url = 'https://api.themoviedb.org/3/movie/';
//     const movieId = `${movieID}?`;

//     try {
//         axios.get(`${url}${movieId}${key}`)
//         .then(response => {
//             return response.data
//         })
//     } catch {

//     }
// }

export default fetchMovies;
