import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie, user, token, onUpdateUser }) => {
    const addFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to add to Favorites");
            const data = await response.json();
            onUpdateUser(data);
        } catch (err) {
            console.error("Error adding favorite movie", err);
        }
    };

    const removeFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to remove from Favorites");
            const data = await response.json();
            onUpdateUser(data);
        } catch (err) {
            console.error("Error deleting favorite movie", err);
        }
    }


    return (
        <Card>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                </Link>
                <Button onClick={addFavorite}>
                    Add to Favorites
                </Button>
                <Button onClick={removeFavorite}>
                    Remove from Favorites
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string
        }),
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool
    }).isRequired,
};
