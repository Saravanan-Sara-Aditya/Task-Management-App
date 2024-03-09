import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../Authentication/firebase'; 
import { useHistory, Link } from 'react-router-dom';

const TopNavBar = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); 
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        history.push("/login");
      })
      .catch(error => {
        console.error('Error occurred during logout:', error);
      });
  };

  return (
    <Navbar className='gradient-bg' variant="dark" expand="lg">
      <Container>      
        <Navbar.Brand>TMA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {currentUser ? ( 
              <NavDropdown id="profile-title" style={{color:"#fff"}} title={currentUser.displayName}>

                <NavDropdown.Item as={Link} to="/Profile">My Account</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link className='text-white' as={Link} to="/login">Login</Nav.Link>
              
            )}
              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
