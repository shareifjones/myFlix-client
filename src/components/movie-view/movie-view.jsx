import Col from "react-bootstrap/Col";
import "./movie-view.scss"

export const MovieView = ({ movie, onBackClick }) => {
    console.log("incorrect", movie)
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button onClick={onBackClick}
                className="back-button"
                style={{ cursor: "pointer" }}
            >Back</button>
        </div>
    );
};
