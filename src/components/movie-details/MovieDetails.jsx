import React from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Styled from './MovieDetails.module.css';
import { fetchMovieDetails } from 'api/fetchMovies';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      // console.log(data);
      setData(data);
    });
  }, [movieId]);

  
  return (
    <div>
    {/* Link to go back to movie query search */}
      <h5>
        Click <Link onClick={(e) => {
          console.log(e.currentTarget)
          e.preventDefault();
          navigate(-1, {replace: true});
        }}>Here</Link> to go back 
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
                  <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                </li>
                <li>
                  <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
                </li>
              </ul>
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
