import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmbulance } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Resources/images/logo.png';
import './Navbar.css';


function CollapsibleExample() {
    return (
        <div>
            <div className="container-fluid section-navbar">
                    <div className="row">
                        <div className="heading">
                            <h4><FontAwesomeIcon icon={faEnvelope} /><a href="mailto:ayurvedha@gmail.com">ayurvedha@gmail.com</a></h4>
                            <h4><FontAwesomeIcon icon={faAmbulance} /><a href="tel:+1616">1616</a></h4>
                            <h4><FontAwesomeIcon icon={faPhoneAlt} /><a href="tel:+ 077-332-3320"> 077-332-3320</a></h4>
                        </div>
                        <Navbar collapseOnSelect expand="lg" >
                            <Container className='nav-container'>
                                <div className="col-lg-2 col-xs-12  content-1">
                                    <Navbar.Brand href="/"><img src={Logo} alt="" /></Navbar.Brand>
                                </div>
                                <div className="col-lg-8 col-xs-12  content-2">
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link as={Link} to="/" className='navlink'>Home</Nav.Link>
                                            <Nav.Link as={Link} to="/channels" className='navlink'>Channels</Nav.Link>
                                            <Nav.Link as={Link} to="/products" className='navlink'>Products</Nav.Link>
                                            <Nav.Link as={Link} to="/offers" className='navlink'>Offers</Nav.Link>
                                            <Nav.Link as={Link} to="/treatments" className='navlink'>Treatments</Nav.Link>
                                            <Nav.Link as={Link} to="/staff" className='navlink'>Staff</Nav.Link>
                                            <Nav.Link as={Link} to="/gallery" className='navlink'>Gallery</Nav.Link>
                                            <Nav.Link as={Link} to="/aboutus" className='navlink'>About-Us</Nav.Link>

                                            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.2">
                                                    Another action
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="#action/3.4">
                                                    Separated link
                                                </NavDropdown.Item>
                                            </NavDropdown> */}
                                        </Nav>
                                        <div className="col-lg-2 col-xs-12  content-3">
                                            <Nav>
                                                <FontAwesomeIcon icon={faTachometerAlt} /> <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                            </Nav>
                                            <Nav>
                                                <Nav.Link as={Link} to="/profile">Account</Nav.Link>
                                                <FontAwesomeIcon icon={faUser} />
                                            </Nav>

                                        </div>
                                    </Navbar.Collapse>
                                </div>
                            </Container>
                        </Navbar>
                </div>
            </div>
        </div>
    );

}

export default CollapsibleExample;
