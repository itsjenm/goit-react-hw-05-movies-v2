import { fetchMovieReviews } from 'api/fetchMovies';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId, page } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId, page).then(data => {
      // console.log(data.results)
      setReviews(data.results);
    });
  }, [movieId, page]);

  console.log(reviews);

  return (
    <div>
      {reviews.length > 0 ? (
        <div>
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>We don't have any reviews for this movie.</h3>
      )}
    </div>
  );
};

export default Reviews;
