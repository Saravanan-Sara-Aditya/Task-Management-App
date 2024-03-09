import React, { useState } from 'react';
import firebase from '../Authentication/firebase';
import { useHistory } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      } else {
        setEmailError('');
      }

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
        return;
      } else {
        setPasswordError('');
      }

      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      const authData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
      localStorage.setItem('authData', JSON.stringify(authData));

      toast.success('Login successful!');

      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Card className='shadow w-lg-50 m-3 mx-lg-auto '>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card.Body>
        <h1 className='text-center'>Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-semibold'>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='fw-semibold'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="text-start">
            <Link to="/ForgetPassword">
              Forget Password
            </Link>
          </div>
          <Button className='mt-2 mb-3 bg-primary' type='submit'>Submit</Button>
        </Form>
        <p className="text-center mb-0">New User?
          {" "}
          <Link to="/SignUp">
            Sign Up
          </Link>
          {" "}
          to Create a New Account
        </p>
      </Card.Body>
    </Card>
  );
};

export default Login;
