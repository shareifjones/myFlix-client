import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                    <img
                        src="https://i.etsystatic.com/10919371/r/il/9bd32c/1526385928/il_fullxfull.1526385928_bh9i.jpg"
                        width="30"
                        height="30"
                        className="align-top"
                        alt="flix logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
NavigationBar.propTypes = {
    user: PropTypes.object,
    onLoggedOut: PropTypes.func.isRequired,
};