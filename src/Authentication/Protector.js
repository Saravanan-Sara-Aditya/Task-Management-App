import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { auth } from '../Authentication/firebase';

const Protector = ({ component: Component, ...rest }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);

    });
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          null
        )
      }
    />
  );
};

export default Protector;
