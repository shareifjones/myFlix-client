import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({ user, token, movies, onLoggedIn }) => {
    const [userInfo, setUserInfo] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch user info");
                const data = await response.json();
                setUserInfo(data);
                setUsername(data.username);
                setPassword(data.password);
                setEmail(data.email);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserInfo();
    }, [user, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ Username: username, Password: password, Email: email, Birthday: birthday })
            });
            if (!response.ok) throw new Error("Failed to update user info");
            const data = await response.json();
            setUserInfo(data);
            onLoggedIn(data.username, token);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeregister = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to deregister");
            onLoggedIn(null, null);
        } catch (err) {
            setError(err.message);
        }
    };

    const favoriteMovies = movies.filter(m => userInfo.favoriteMovies?.includes(m._id));

    return (
        <div>
            <div className="movies">
                <h2>Favorite Movies</h2>
                {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} user={user} token={token} onUpdateUser={setUserInfo} />
                ))}
                <h4>Need to update info?</h4>
            </div>
            <form onSubmit={handleUpdate}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Birthday:
                    <input
                        type="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </label>
                <Button type="submit" variant="outline-dark" onClick={handleUpdate}>Update</Button>
            </form>
            <Button variant="outline-dark" onClick={handleDeregister}>Deregister</Button>
        </div>
    );
};

export default ProfileView;
