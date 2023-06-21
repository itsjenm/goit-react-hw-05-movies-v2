import fetchMovies from 'api/fetchMovies';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Styled from './Movies.module.css'

const Movies = () => {
  // const [movieID, setMovieID] = useState();
  // input useRef 
  const location = useLocation(); 
  const searchRef = useRef(null);
  const [searchParam, setSearchParam] = useSearchParams();
  // console.log(searchParam)
  //a getter to get title Param
  const name = searchParam.get(('query') || '');
  const nav = useNavigate();
  // const [data, setData] = useState(() => )
  const [results, setResults] = useState([]);
  // const [data, setData] = useState(() =>
  //   results.filter(movie =>
  //       movie.original_title.toLowerCase().includes(title)
  //     )
  // )
  const [formValues, setFormValues] = useState({
    query: ""
  })

  // console.log(title);

  useEffect(() => {
    fetchMovies(searchParam).then(data => {
      // console.log(searchParam)
      setResults(data.results);
      // localStorage.setItem('searchParam', JSON.stringify(formValues.name));
    });
  }, [searchParam, formValues]);

  // console.log(results)

  function handleInputChange(event) {
    // console.log(event.target.value);
    setSearchParam({ query: event.target.value})
    setFormValues({ ...formValues, query: event.target.value})
    // localStorage.setItem('searchParam', JSON.stringify(event.target.value));
  }


  function handleSubmit(event) {
    event.preventDefault();
    nav(`/movies?query=${name}`)
    setResults([...results, formValues]);
    setFormValues({
      query: ''
    })
  }

  // console.log('MovieSearch Location', location);

  return (
    <div className={Styled.form_container}>
      <form onSubmit={handleSubmit}>
        <h1 className={Styled.form_title}>Movies</h1>
        <input type="text" onChange={handleInputChange} value={formValues.query} ref={searchRef} placeholder='Enter a title you want to search for' className={Styled.inputbox}/>
        <button type="submit">Search</button>
        {results.length > 0 ? (
          <ul className={Styled.movie_list}>
            {results.map(movie => (
              <li key={movie.id}>
                <h3><Link to={`/movies/${movie.id}`} state={{ from: location.pathname + location.search }}>{movie.original_title}</Link></h3>
              </li>
            ))}
          </ul>
        ) : (
          <h3>No Movies available</h3>
        )}
      </form>
    </div>
  );
};

export default Movies;
