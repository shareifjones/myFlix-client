import React from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import { Logo } from "../img/myFlix.png";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                    <Navbar.Brand href="#">
                        <Image
                            src={Logo}
                            style={{ height: '33px', width: '33px', padding: '5px' }}
                            className="align-top"
                            alt="myFlix logo"
                        />
                    </Navbar.Brand>
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

export default NavigationBar;