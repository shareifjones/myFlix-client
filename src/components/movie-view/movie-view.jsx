import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"

export const MovieView = ({ movies }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    console.log("working", movieId)

    return (
        <div class="center">
            <div>
                <img className="w-100" src={movie.image} fluid />
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
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
