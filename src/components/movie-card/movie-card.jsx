import PropTypes from "prop-types";
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onMovieClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div >
    );
};

MovieCard.PropTypes = {
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
    onMovieClick: PropTypes.func.isRequired
};