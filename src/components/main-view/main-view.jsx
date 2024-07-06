import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://shareif-flix-0b8cde79839e.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    const moviesFromApi = data.map(movie => {
        return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: [{
                name: movie.Genre.Name,
                description: movie.Genre.Description
            }],
            director: [{
                name: movie.Director.Name,
                bio: movie.Director.Bio,
                birth: movie.Director.Birth
            }],
            image: movie.Image,
            featured: movie.Featured
        }
    });
}
setMovies(moviesFromApi);

if (!user) {
    return (
        <>
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
            or
            <SignupView />
        </>
    );
}

if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
}

if (movies.length === 0) {
    return <div>The list is empty!</div>;
}

return (
    <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
    </div>
);