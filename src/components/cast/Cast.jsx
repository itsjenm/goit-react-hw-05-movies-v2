import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'api/fetchMovies';
import Styled from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(data => {
      // console.log(data)
      setCast(data.cast);
    });
  }, [movieId]);

  console.log(cast);

  return (
    <div>
      {cast.length > 0 ? (
        <>
          <ul className={Styled.cast_list}>
            {cast.map(
              (
                person //brackets not needed in order to render correctly
              ) => (
                <li key={person.id} className={Styled.cast_profile}>
                  <a
                    href={`https://www.google.com/search?q=${person.original_name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                          className={Styled.cast_image}
                          alt={person.original_name}
                        />
                      ) : (
                        <h3>No Photo Available</h3>
                      )}
                    </div>
                  </a>
                  <div className={Styled.cast_data}>
                    <p>Name: {person.original_name}</p>

                    <p>Character: {person.character}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <h3>No Casts</h3>
      )}
    </div>
  );
};

export default Cast;
