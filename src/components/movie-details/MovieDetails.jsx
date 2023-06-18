import React from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import Styled from './MovieDetails.module.css';
import { fetchMovieDetails } from 'api/fetchMovies';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);

  // console.log(movieId);

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      // console.log(data);
      setData(data);
    });
  }, [movieId]);

  // console.log(data);

  return (
    <div>
    <h5>Click <Link to='/'>Here</Link> to go back to home</h5>
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
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </div>
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
