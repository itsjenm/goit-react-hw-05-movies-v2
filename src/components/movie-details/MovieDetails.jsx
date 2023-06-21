import React, { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, Route, useLocation, useParams, Routes } from 'react-router-dom';
import { useState } from 'react';
import Styled from './MovieDetails.module.css';
import { fetchMovieDetails } from 'api/fetchMovies';

const Cast = lazy(() => import('../../components/cast/Cast'));
const Reviews = lazy(() => import('../../components/reviews/Reviews'));


const MovieDetails = () => {
  const location = useLocation(); 
  const { movieId } = useParams();
  const [data, setData] = useState(null);


  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      // console.log(data);
      setData(data);
    });
  }, [movieId]);

  // console.log('MovieDetails Location', location);

  const path = location?.state?.from ?? '/';

  // // Code used to parse to local storage and get query search param 
  // const initializeSearchValue = () => {
  //   // console.log(JSON.parse(localStorage.getItem('searchParam')))
  //   return JSON.parse(localStorage.getItem('searchParam'));
  // }

  // // initializeSearchValue()


  return (
    <div>
    {/* Link to go back to movie query search */}
      <h5 className={Styled.back_link}>
        Click <Link to={path}>here</Link> to go back  
      </h5>
      {data && (
        <section className={Styled.moviepage_section}>
          <div className={Styled.image_container}>
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              alt="movie poster"
              className={Styled.movie_poster}
            />
          </div>
          <div className={Styled.movieinfo_container}>
            <h1>{data.title}</h1>
            <h3>Overview: </h3>
            <p>{data.overview}</p>
            <h4>{data.genres.length > 1 ? 'Genres:' : 'Genre:'} </h4>
            <li className={Styled.genre_list}>
              {data.genres.map(
                (genre, index) => (index ? ', ' : '') + genre.name
              )}
            </li>
            <div className={Styled.additionalinfo_container}>
              <h4>Additional Information</h4>
              <ul>
                <li>
                  <Link to="cast" state={{ from: path }}>Cast</Link>
                </li>
                <li>
                  <Link to="reviews" state={{ from: path }}>Reviews</Link>
                </li>
              </ul>
            </div>
            <Suspense>
              <Routes>
                <Route path="cast" element={<Cast movieId={movieId} />} />
                <Route path="reviews" element={<Reviews movieId={movieId} />} />
              </Routes>
            </Suspense>
            {/* <h5>
              Released: {new Date(data.release_date).toLocaleDateString()}
            </h5>
            <h5>Popularity: {data.popularity}</h5> */}
          </div>
        </section>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetails;
