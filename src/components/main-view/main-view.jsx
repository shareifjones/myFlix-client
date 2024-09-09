import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [movies, setMovies] = useState([]);
    const handleLoggedIn = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };



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
                        image: movie.ImageURL,
                        featured: movie.Featured
                    }
                });

                setMovies(moviesFromApi);
            });
    }, [token]);

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, movies]);




    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={(query) => setFilter(query)}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView onLoggedIn={handleLoggedIn} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={handleLoggedIn} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} user={user} token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>

                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-4 px-2" md={3} sm={4} key={movie.id} >
                                                <MovieCard movie={movie} user={user.Username} token={token} onUpdateUser={setUser} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    < Col md={5}>
                                        <ProfileView user={user} token={token} movies={movies} onUpdateUser={setUser} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter >
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


