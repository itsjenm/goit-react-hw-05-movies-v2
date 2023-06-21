import { fetchTrendingMovies } from 'api/fetchMovies';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Styled from './Home.module.css';

export default function Home() {
  const location = useLocation(); 
  const { page } = useParams();
  //array for movies
  const [movies, setMovies] = useState([]);
  // const content = [];
  // for (let i = 0; i < 1000; i++) {
  //   content.push(<p key={i}>This is some heavy content</p>);
  // }

  useEffect(() => {
    fetchTrendingMovies(page).then(data => {
      // console.log(data.results)
      setMovies(data.results);
    });
  }, [page]);

  // console.log('HomePage Location', location);

  return (
    <div className={Styled.trendingmovies_container}>
      <h1>Movies Trending Today</h1>
      {/* <h5>
        Click <Link to="/movies">Here</Link> to search movies
      </h5> */}
      <ul>
      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location.pathname + location.search }}>{movie.title}</Link>
          </li>
        ))}
        </ul>
    </div>
  );
}
