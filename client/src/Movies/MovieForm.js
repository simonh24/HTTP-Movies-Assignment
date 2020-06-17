import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import { Card, TextField, Button } from "@material-ui/core";

const StyledCard = styled(Card)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 35%;
    padding: 25px 0;
`;

const MovieForm = () => {

    const { push } = useHistory();

    const initialMovie = {
        title: "",
        director: "",
        metascore: "",
        stars: [],
    }

    const [movie, setMovie] = useState(initialMovie);

    const handleChanges = evt => {
        const { name, value } = evt.target;
        setMovie({ ...movie, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();

        let starsList = [];

        if (movie.stars.indexOf(",") === -1) {
            starsList.push(movie.stars);
        } else {
            starsList = movie.stars.split(", ")
        }

        axios.post(`http://localhost:5000/api/movies`, { ...movie, stars: starsList })
            .then(res => {
                console.log(res)
                push("/")
            })
            .catch(err => console.log(err))
    }

    return (

        <form onSubmit={onSubmit}>
        <StyledCard>
            <TextField
                variant="outlined"
                type="text"
                name="title"
                onChange={handleChanges}
                placeholder="title"
                value={movie.title}
            />
            <br></br>
            <TextField
                variant="outlined"
                type="text"
                name="director"
                onChange={handleChanges}
                placeholder="director"
                value={movie.director}
            />
            <br></br>
            <TextField
                variant="outlined"
                type="text"
                name="metascore"
                onChange={handleChanges}
                placeholder="metascore"
                value={movie.metascore}
            />
            <br></br>
            <TextField
                variant="outlined"
                type="text"
                name="stars"
                onChange={handleChanges}
                placeholder="stars"
                value={movie.stars}
            />
            <br></br>

            <Button variant="contained" color="primary" onClick={onSubmit}>Add</Button>
        </StyledCard>
    </form>
    )
}

export default MovieForm;