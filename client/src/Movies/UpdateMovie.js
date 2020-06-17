import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

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
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movie.stars}
                />

                <button >Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
