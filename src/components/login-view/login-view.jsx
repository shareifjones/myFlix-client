import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";



export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        try {
            const response = await fetch(`https://shareif-flix-0b8cde79839e.herokuapp.com/login?Username=${data.Username}&Password=${data.Password}`,

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        }
        catch (e) {
            alert("Something went wrong");
        }
    }

    return (
        <div>
            <div className="login">
                <h2 className="text-center">Welcome to myFlix!</h2>
                <h4 className="text-center">Login Here: </h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label><b>Username: </b></Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label><b>Password: </b></Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
