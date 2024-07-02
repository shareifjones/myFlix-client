import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        /*
        {
            id: 1,
            title: "Bad Boys",
            description: "Bad Boys is a 1995 American buddy cop action comedy film directed by Michael Bay in his feature directorial debut, produced by Don Simpson and Jerry Bruckheimer, and starring Martin Lawrence and Will Smith as two Miami narcotics detectives Marcus Burnett and Mike Lowrey.",
            image: "https://facts.net/wp-content/uploads/2023/11/32-facts-about-the-movie-bad-boys-1699680787.jpg",
            director: "Michael Bay",
            genre: "Action Comedy"
        },
        {
            id: 2,
            title: "How High",
            description: "In the film, Redman and Method Man portray two cannabis users who are visited by the ghost of a deceased friend after smoking his ashes. The ghost helps with their exams, and they receive scholarships to Harvard University. The film was released by Universal Pictures on December 21, 2001, and received generally negative reviews from critics.",
            image: "https://images.moviesanywhere.com/b82070f141a4a776fefe195233f28fd0/d3d0e98f-f194-4e54-9856-660f65eb0338.jpg",
            director: "Jesse Dylan",
            genre: "Comedy"
        },
        {
            id: 3,
            title: "Interstellar",
            description: "Set in a dystopian future where Earth is suffering from catastrophic blight and famine, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humankind.",
            image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
            director: "Christopher Nolan",
            genre: "Science Fiction"
        }
        */
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://shareif-flix-0b8cde79839e.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map(movie => {
                    return {
                        id: movie._id,
                        Title: movie.title,
                        Description: movie.description,
                        Genre: [{
                            Name: movie.genre.name,
                            Description: movie.genre.description
                        }],
                        Director: [{
                            Name: movie.director.name,
                            Bio: movie.director.bio,
                            Birth: movie.director.birth
                        }],
                        Image: movie.image,
                        Featured: movie.Featured
                    }
                });
                // if (moviesFromApi.length === 0) {
                //    return <div>The list is empty!</div>;
                // }
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (moviesFromApi.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
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
}