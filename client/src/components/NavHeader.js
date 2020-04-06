import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import logo from '../logo.jpg';
import './NavHeader.css';

export const NavHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="navbar" expand="md">
                <NavbarBrand className="app-title" href="/">
                    <img className="app-logo" src={logo} alt="App Logo" />
                    <h6>SLTranslator</h6>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="nav-item">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </NavItem>
                        <NavItem className="nav-item">
                            <Link className="nav-link" to={"/tutorial"}>Tutorials</Link>
                        </NavItem>
                        <NavItem className="nav-item">
                            <Link className="nav-link" to={"/search"}>Translate</Link>
                        </NavItem>
                        <NavItem className="nav-item">
                            <a className="nav-link" href="https://github.com/sunnyr3/SDD4.0">GitHub</a>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavHeader;