import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../Authentication/firebase'; // Assuming database is exported from firebase.js

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { id: Date.now().toString(), ...task }; // Generate unique ID
    setTasks([...tasks, newTask]);
    addTaskToFirebase(newTask);
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTaskInFirebase(taskId, updatedTask);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    deleteTaskFromFirebase(taskId);
  };

  const addTaskToFirebase = (task) => {
    const tasksRef = database.ref('tasks');
    tasksRef.push(task)
      .then(() => {
        console.log('Task added to Realtime Database successfully');
      })
      .catch((error) => {
        console.error('Error adding task to Realtime Database: ', error);
      });
  };

  const updateTaskInFirebase = (taskId, updatedTask) => {
    const taskRef = database.ref(`tasks/${taskId}`);
    taskRef.update(updatedTask)
      .then(() => {
        console.log('Task updated in Realtime Database successfully');
      })
      .catch((error) => {
        console.error('Error updating task in Realtime Database: ', error);
      });
  };

  const deleteTaskFromFirebase = (taskId) => {
    const taskRef = database.ref(`tasks/${taskId}`);
    taskRef.remove()
      .then(() => {
        console.log('Task deleted from Realtime Database successfully');
      })
      .catch((error) => {
        console.error('Error deleting task from Realtime Database: ', error);
      });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};