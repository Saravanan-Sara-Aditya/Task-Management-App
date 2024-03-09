import React, { useState } from 'react';
import firebase from '../Authentication/firebase';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history = useHistory();

  const handleSignUp = async (e) => {

    e.preventDefault();

    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    else if (name.length < 5) {
      setNameError('Name must be at least 5 characters long');
      isValid = false;
    }
    else {
      setNameError('');
    }

   
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)) {
      setPasswordError('Password must contain at least one number, one symbol, and one letter');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await user.updateProfile({ displayName: name });
        await user.sendEmailVerification();
        
        toast.success('Sign up successful!');
       
        setTimeout(() => {
          history.push("/login");
        }, 1000); 
      } catch (error) {
        toast.error("Provide Valid Credentials");
      }
    }
  };

  return (
    <Card className='shadow w-lg-50 mt-lg-6 mx-lg-auto m-3'>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Card.Body>
        <h1 className='text-center'>Sign Up</h1>
        <Form onSubmit={handleSignUp}>
          <Form.Group className='mb-3' controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" className='mb-3' type="submit">
            Sign Up
          </Button>
          <p className="text-center mb-0">Already an User? <Link to="/login">Login</Link></p>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;