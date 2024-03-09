import React, { useState } from 'react';
import firebase from './firebase';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      toast.success('Password reset email sent successfully. Please check your email inbox.');

      setTimeout(() => {
        history.push("/login");
      }, 2000);

    } catch (error) {
      toast.error("Enter a Valid Email Address");
    }
  };

  return (
    <Container>
      <Card className='shadow w-lg-50 mx-lg-auto m-3'>
        <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
        <Card.Body>
          <h2>Forgot Password</h2>
          <Form onSubmit={handleResetPassword}>
            <Form.Group className='mb-3' controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <div className='d-flex gap-1 flex-wrap'>
              <Button variant="success" type="submit">
                Reset Password
              </Button>
              {" "}
              <Button variant="primary" as={Link} to="/login">
                Back
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgetPassword;
