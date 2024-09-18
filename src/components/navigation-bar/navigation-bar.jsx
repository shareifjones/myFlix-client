import React from "react";
import { Navbar, Container, Nav, NavbarBrand, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, showSearch, onSearch, onLoggedOut }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    };


    return (
        <Navbar bg="dark" data-bs-theme="dark" className="">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>

                {/*large screens */}
                {user && showSearch && (
                    <Form className="d-none d-lg-flex mx-auto align-items-center">
                        <Form.Control
                            type="search"
                            placeholder="Search movie"
                            className="me-2 custom-search"
                            aria-label="Search"
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-light">Search1</Button>
                    </Form>
                )}
                {/*small screens */}
                {user && (
                    <Form className="d-lg-none d-flex align-items-center ms-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search movie"
                            className="me-2 custom-search"
                            aria-label="Search"
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-light">Search2</Button>
                    </Form>
                )}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                                    Home
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