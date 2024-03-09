import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import  { auth } from '../Authentication/firebase'; 
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenuAppBar = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  const history = useHistory()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); 
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogout = () => {
    auth.signOut(); 
    history.push("/");
  };

  return (
    <>
      <Navbar className='gradient-bg' variant="dark" expand="lg">
        <Container>      
          <Navbar.Brand>TMA</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav>
            {currentUser ? ( 
              <NavDropdown title={<FontAwesomeIcon icon={faUser} color='white' />}>
                <NavDropdown.Item to="/Profile" as={Link}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <><Nav.Link className='text-white' to="/" as={Link}>Login</Nav.Link></>
            )}
          </Nav>
          
          {currentUser && <span className='d-none ms-md-2 d-md-block text-white'>{currentUser.displayName}</span>} 
        </Container>
      </Navbar>
    </>
  );
};

export default MenuAppBar;
