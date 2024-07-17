import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import UpdateUser from "../profile-view/update-user";


export const MovieCard = ({ movie, user, token, onUpdateUser }) => {

    const addFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie._id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please check your token');
                } else {
                    throw new Error(`Failed to add favorite: ${errorText}`);
                }
            }

            const updatedUser = await response.json();
            console.log('Updated user after adding favorite:', updatedUser);
            onUpdateUser(updatedUser);
        } catch (err) {
            console.error('Error adding movie to favorites:', err.message);
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
        <Card className="text-center mt-2 mb-2" style={{ width: '100%', height: '100%' }} border="black">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="link" >See more</Button>
                </Link>
                <ButtonGroup aria-label="Favorites" vertical>
                    <Button variant="outline-dark" className="d-sm-block" onClick={addFavorite}>
                        Add to Favorites
                    </Button>
                    <Button variant="outline-dark" className="d-sm-block" onClick={removeFavorite}>
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

