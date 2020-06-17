import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Card } from "@material-ui/core";
import styled from "styled-components";

const StyledCard = styled(Card)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 35%;
    padding: 25px 0;
`;

const CeneteredH2 = styled.h2`
    text-align: center;
`;

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const UpdateMovie = props => {
    const { push } = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setMovie({ ...movie, [ev.target.name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        let starsList = [];
        if (movie.stars.indexOf(",") === -1) {
            starsList.push(movie.stars);
        } else {
            starsList = movie.stars.split(", ")
        }
        axios.put(`http://localhost:5000/api/movies/${id}`, { ...movie, stars: starsList })
            .then(res => {
                console.log(res)
                props.setMovieList(res.data);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <CeneteredH2>Update Item</CeneteredH2>
            <form onSubmit={handleSubmit}>
                <StyledCard>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="title"
                        value={movie.title}
                    />
                    <br></br>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="director"
                        value={movie.director}
                    />
                    <br></br>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={movie.metascore}
                    />
                    <br></br>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={movie.stars}
                    />
                    <br></br>

                    <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
                </StyledCard>
            </form>
        </div>
    );
};

export default UpdateMovie;
