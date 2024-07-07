export const MovieView = ({ movie, onBackClick }) => {
    console.log("incorrect", movie)
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <h3>Title: </h3>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
                <div>{movie.director.bio}</div>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
