import fetchMovies from 'api/fetchMovies';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Styled from './Movies.module.css'

const Movies = () => {
  // const [movieID, setMovieID] = useState();
  // input useRef 
  const searchRef = useRef(null);
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam)
  //a getter to get title Param
  const name = searchParam.get(('name') || '');
  const nav = useNavigate();
  // const [data, setData] = useState(() => )
  const [results, setResults] = useState([]);
  // const [data, setData] = useState(() =>
  //   results.filter(movie =>
  //       movie.original_title.toLowerCase().includes(title)
  //     )
  // )
  const [formValues, setFormValues] = useState({
    name: ""
  })

  // console.log(title);

  useEffect(() => {
    fetchMovies(searchParam).then(data => {
      // console.log(data.results)
      setResults(data.results);
    });
  }, [searchParam]);

  console.log(results)

  function handleInputChange(event) {
    // console.log(event.target.value);
    setSearchParam({ name: event.target.value})
    setFormValues({ ...formValues, name: event.target.value})
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    nav(`/movies?query=${name}`)
    setResults([...results, formValues]);
    setFormValues({
      name: ''
    })
  }

  return (
    <div className={Styled.form_container}>
      <form onSubmit={handleSubmit}>
        <h1 className={Styled.form_title}>Movies</h1>
        <input type="text" onChange={handleInputChange} value={formValues.name} ref={searchRef} placeholder='Enter a title you want to search for' className={Styled.inputbox}/>
        <button type="submit">Search</button>
        {results.length > 0 ? (
          <ul className={Styled.movie_list}>
            {results.map(movie => (
              <li key={movie.id}>
                <h3><Link to={`/movies/${movie.id}`}>{movie.original_title}</Link></h3>
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
