import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; 
import Dashboard from '../Components/Dashboard';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import ForgotPassword from '../Authentication/ForgetPassword';
import AddTaskForm from '../Components/AddTaskForm';
import { TaskProvider } from '../Context/TaskContext';
import EditTaskForm from '../Components/EditTaskForm';
import { auth } from '../Authentication/firebase';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Layouts/TopNavbar';
import Profile from '../Components/Profile';

const Routers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <TaskProvider userId={user ? user.uid : null}>
        <TopNavbar />
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route exact path="/">{!user ? <Redirect to="/login" /> : <Dashboard />}</Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/forgetpassword"><ForgotPassword /></Route>
          <Route path="/New_Task">{!user ? <Redirect to="/login" /> : <AddTaskForm />}</Route>
          <Route path="/Profile">{!user ? <Redirect to="/login" /> : <Profile />}</Route>
          <Route path="/EditTask/:taskId">{!user ? <Redirect to="/login" /> : <EditTaskForm />}</Route>
        </Switch>
      </TaskProvider>
    </div>
  );
};

export default Routers;
