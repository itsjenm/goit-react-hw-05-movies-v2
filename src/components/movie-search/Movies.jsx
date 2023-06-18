import fetchMovies from 'api/fetchMovies';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Movies = () => {
  // const [movieID, setMovieID] = useState();
  
  const [searchParam, setSearchParam] = useSearchParams();
  //a getter to get title Param
  const title = searchParam.get('query') || '';
  // const [data, setData] = useState(() => )
  const [results, setResults] = useState([]);
  // const [data, setData] = useState(() => 
  //   results.filter(movie => 
  //       movie.original_title.toLowerCase().includes(title)
  //     )
  // )

  
  console.log(title);
  const nav = useNavigate();

  useEffect(() => {
    fetchMovies(searchParam).then(data => {
      // console.log(data.results)
      setResults(data.results)
    })
  }, [searchParam]);

  // console.log(results)

  function handleInputChange(event) {
    setSearchParam({ query: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    nav(`/movies?query=${title}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Movies</h1>
        <label>Enter a title you want to search for</label>
        <input type="search" onChange={handleInputChange} value={title} />
        <button type="submit">Submit</button>
        {results.length > 1 ? (
          <ul>{results.map((movie) => 
            <li key={movie.id}>
              <h3>{movie.original_title}</h3>
            </li>
          )}</ul>
        ) : (
          <h3>No Movies available</h3>
        )}
      </form>
    </div>
  );
};

export default Movies;
