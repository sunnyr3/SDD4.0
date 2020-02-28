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
                            <Link className="nav-link" to={"/"}>Tutorials</Link>
                        </NavItem>
                        <NavItem className="nav-item">
                            <a className="nav-link" href="https://github.com/sunnyr3/SDD4.0">GitHub</a>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        {/*<nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="title-link" href="/">
                        <div className="app-title">
                            <img className="app-logo" src={logo} alt="App Logo" />
                            <h6>SLTranslator</h6>
                        </div>
                    </a>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to={"/"}>Home</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to={"/"}>Tutorials</Link>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="https://github.com/sunnyr3/SDD4.0">GitHub</a>
                </li>
            </ul>
        </nav>*/}
        </div>
    );
}

export default NavHeader;