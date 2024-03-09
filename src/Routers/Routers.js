import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Components/Dashboard'
import Login from '../Authentication/Login'
import SignUp from '../Authentication/SignUp'
import ForgotPassword from '../Authentication/ForgetPassword'
import AddTaskForm from '../Components/AddTaskForm'
import { TaskProvider } from '../Context/TaskContext';
import EditTaskForm from '../Components/EditTaskForm'
import { auth } from '../Authentication/firebase';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../Layouts/TopNavbar'
import Profile from '../Components/Profile'
import ProtectedRoute from '../Authentication/Protector'

const Routers = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });


    return () => unsubscribe();
  }, []);

  return (
    <div>
      <TaskProvider userId={user ? user.uid : null}>

        <TopNavbar />

        <Switch>
          <Route exact path="/"><Login /></Route>
          <ProtectedRoute path="/dashboard"><Dashboard /></ProtectedRoute>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/forgetpassword"><ForgotPassword /></Route>
          <ProtectedRoute path="/New_Task"><AddTaskForm /></ProtectedRoute>
          <ProtectedRoute path="/Profile"><Profile /></ProtectedRoute>
          <ProtectedRoute path="/EditTask/:taskId"><EditTaskForm /></ProtectedRoute>
        </Switch>
      </TaskProvider>
    </div>
  )
}

export default Routers
