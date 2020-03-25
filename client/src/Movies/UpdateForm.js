import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateForm = props => {
    const params = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: [""]
    });

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "stars") {
            console.log(value);
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })

    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            console.log("Put", res);
            props.setMovieList(res.data);
            history.push("/");
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => `${movie.id}` === params.id);
        movieToUpdate && setMovie(movieToUpdate);
    }, [props.movies])

    return (
        <div className = "updateform">
            <h2>Update Movie</h2>
           <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Title"
          value={movie.title}
        />
        <br/>
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="Director"
          value={movie.director}
        />
        <br/>
        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <br/>
        <input
          type="text"
          name="stars"
          onChange={handleChanges}
          placeholder="Stars"
          value={movie.stars}
        />
        <br/>

        <button> Update </button>
      </form>
        </div>
    )
}

export default UpdateForm;