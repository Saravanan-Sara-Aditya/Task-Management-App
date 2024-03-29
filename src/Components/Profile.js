import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { auth } from '../Authentication/firebase';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const history = useHistory()

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserData({
                    name: user.displayName,
                    email: user.email
                });
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        auth.signOut();
        history.push("/login");
    };

    return (
        <Container>
            <Card className='m-md-5 mb-3'>
                <Card.Body>
                    <h1 className='text-center'>Profile</h1>
                    {userData ? (
                        <>
                            <span>
                                <h5 className='d-inline'>Name : </h5>
                                {userData.name}
                            </span>
                            <span className='d-block mt-3 mb-3'>
                                <h5 className='d-inline'>Email : </h5>
                                {userData.email}
                            </span>
                            <Button onClick={handleLogout} variant='danger'>Sign Out</Button>
                            {" "}
                            <Link to="/">
                                <Button variant="primary">
                                    Back
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
