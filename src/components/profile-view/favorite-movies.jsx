import React from "react";

function FavoriteMovies({ favoriteMovies }) {
    return (
        <>
            <div className="movies">
                <h2>Favorite Movies</h2>
                {favoriteMovies.map((movies) => (
                    <MovieCard key={movies.id} movie={movies} user={user} token={token} onUpdateUser={setUserInfo} />
                ))}
                <h4>Need to update info?</h4>
            </div>
        </>
    )
}

export default FavoriteMovies;