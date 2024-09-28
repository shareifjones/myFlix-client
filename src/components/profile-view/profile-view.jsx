import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import NavigationBar from "../navigation-bar/navigation-bar";

export const ProfileView = ({ user, movies, token, onLoggedIn }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [userInfo, setUserInfo] = useState(storedUser ? storedUser : null);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user.Username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error details:', errorText);
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Please check your token');
                    } else {
                        throw new Error('Failed to fetch user info');
                    }
                }
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
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user.Username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ Username: username, Password: password, Email: email, Birthday: birthday })
            });

            if (response.ok) {
                alert("Updated profile");
            }
            if (!response.ok) throw new Error("Failed to update user info");
            const data = await response.json();
            setUserInfo(data);
            onLoggedIn(data, token);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeregister = async () => {
        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to deregister");
            onLoggedIn(null, null);
        } catch (err) {
            setError(err.message);
        }
    };

    const FavoriteMovies = movies?.filter(m => userInfo.FavoriteMovies?.includes(m.id));



    return (

        <div>
            <div className="movies">
                <h2 className="text-center">Favorite Movies</h2>
                {FavoriteMovies.length === 0 ? (
                    <p>No favorite movies added yet!</p>
                ) : (
                    FavoriteMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} user={user.Username} token={token} onUpdateUser={setUserInfo} />
                    ))
                )}
                {// need a 4th parameter that reports changes to favorite movies
                }

            </div>
            <div>
                <h4 className="text-center">Need to update info?</h4>
            </div>
            <Form className="text-center" onSubmit={handleUpdate}>
                <Form.Label>
                    Username:
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Label>
                <Form.Label>
                    Password:
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Label>
                <Form.Label>
                    Email:
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Label>
                <Form.Label>
                    Birthday:
                    <Form.Control
                        type="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Label>

            </Form>
            <div className="text-center">
                <Button type="submit" variant="outline-dark" onClick={handleUpdate}>Update Profile</Button>
                <Button variant="outline-dark" onClick={handleDeregister}>Delete Profile</Button>
            </div>
        </div>
    );
};

export default ProfileView;
