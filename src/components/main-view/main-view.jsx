import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
                const moviesFromApi = movies.map(movie => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description
                        },
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio,
                            birth: movie.Director.Birth
                        },
                        image: movie.Image,
                        featured: movie.Featured
                    }
                });

                setMovies(moviesFromApi);
            });
    }, [token]);




    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((book) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};

// if (selectedMovie) {
//     return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
// }

// if (movies.length === 0) {
//     return <div>The list is empty!</div>;
// }

// return (
//     <div>
//         <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//         {movies.map((movie) => (
//             <MovieCard
//                 key={movie.id}
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                     setSelectedMovie(newSelectedMovie);
//                 }}
//             />
//         ))}
//     </div>
// );


