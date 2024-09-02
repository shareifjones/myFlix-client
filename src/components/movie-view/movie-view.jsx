import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import "./movie-view.scss"

export const MovieView = ({ movies, user, token, onUpdateUser }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    console.log("working", movieId)

    const addFavorite = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}/movies/${movie.id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("username add", user)

            if (response.ok) {
                alert("Added to favorites");
            }
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
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("username remove", user)
            if (response.ok) {
                alert("Removed from favorites");
            }
            if (!response.ok) throw new Error('Failed to remove favorite');
            const updatedUser = await response.json();
            console.log("deleted movie", updatedUser);
            onUpdateUser(updatedUser);
        } catch (err) {
            console.error('Error removing favorite:', err);
        }
    };

    return (
        <div class="center">
            <div>
                <img className="image mt-2 mb-2" src={movie.image} fluid />
            </div>
            <div>
                <h4><b>{movie.title}</b></h4>
            </div>
            <div>
                <span><b>Description: </b></span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span><b>Director: </b></span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span><b>Genre: </b></span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <ButtonGroup aria-label="Favorites" vertical>
                    <Button variant="outline-dark" onClick={addFavorite}>
                        Add to Favorites
                    </Button>
                    <Button variant="outline-dark" onClick={removeFavorite}>
                        Remove from Favorites
                    </Button>
                </ButtonGroup>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

export default MovieView;