import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, deleted, setDeleted }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        console.log("res.data", res.data);
      })
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Delete", res.data);
        setDeleted(!deleted);
        history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`);
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick = {updateMovie}>Update Movie</button>
      <button onClick = {() => deleteMovie(params.id)}> Delete </button>
    </div>
  );
}

export default Movie;
