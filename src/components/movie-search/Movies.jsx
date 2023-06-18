import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movieID, setMovieID] = useState();
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useSearchParams();
  const title = searchParam.get('title') || '';
  // const [data, setData] = useState(() => )

  console.log(title);
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/550?api_key=36aae46d872dddaed5df56cf6ef9643b`
      )
      .then(response => {
        console.log(response.data);
      });
  });

  function handleInputChange(event) {
    setSearchParam({ title: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    nav(`/search/movie?query=${title}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Movies</h1>
        <label>Enter a title you want to search for</label>
        <input type="search" onChange={handleInputChange} value={title} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Movies;
