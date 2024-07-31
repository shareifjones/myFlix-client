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
                        <img
                            src="https://www.google.com/imgres?q=movies%20logo&imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F04%2F64%2F78%2F74%2F360_F_464787423_mFNIhM8f00HagGgI2eGzsf3wevZhPHCC.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3D%2522movie%2Blogo%2522&docid=V2I26roF5Vo_1M&tbnid=zvmG0_K3sFoLxM&vet=12ahUKEwjCsvyV6MyHAxXFFVkFHb9MImEQM3oECHkQAA..i&w=361&h=360&hcb=2&itg=1&ved=2ahUKEwjCsvyV6MyHAxXFFVkFHb9MImEQM3oECHkQAA"
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