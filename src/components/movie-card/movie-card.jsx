import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import UpdateUser from "../profile-view/update-user";


export const MovieCard = ({ movie, user, token, onUpdateUser }) => {

    const addFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to add favorite');
            const updatedUser = await response.json();
            onUpdateUser(updatedUser);
        } catch (err) {
            console.error('Error adding favorite:', err);
        }
    };

    const removeFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to remove favorite');
            const data = await response.json();
            onUpdateUser(data);
        } catch (err) {
            console.error('Error removing favorite:', err);
        }
    };


    return (
        <Card className="text-center">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="link" className="more-button" >See more</Button>
                </Link>
                <ButtonGroup aria-label="Favorites">
                    <Button variant="outline-dark" onClick={addFavorite}>
                        Add to Favorites
                    </Button>
                    <Button variant="outline-dark" onClick={removeFavorite}>
                        Remove from Favorites
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;

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

