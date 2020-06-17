import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import styled from "styled-components";

import { Button } from "@material-ui/core";

const StyledDiv = styled.div`
  width: 10%;
  margin: 0 45%;
  display: flex;
  flex-direction: column;
`;

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const { push } = history;

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/movies/${movie.id}/update`);
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        addToSavedList(res.data);
        push(`/`);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <StyledDiv>
      <Button variant="contained" color="primary" className="update-button" onClick={updateMovie}>
        Update
      </Button>
      <br></br>
      <Button variant="contained" color="secondary" className="delete-button" onClick={deleteMovie}>
        Delete
      </Button>
      </StyledDiv>
    </div>
  );
}

export default Movie;
