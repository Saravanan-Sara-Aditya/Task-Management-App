import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../Authentication/firebase'; 

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children, userId }) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = database.ref(`users/${userId}/tasks`);
    tasksRef.on('value', (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksArray = Object.keys(tasksData).map((taskId) => ({
          id: taskId,
          ...tasksData[taskId],
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });

   
    return () => tasksRef.off('value');
  }, [userId]);

  const addTask = (task) => {
    const newTask = { id: Date.now().toString(), ...task }; 
    const taskRef = database.ref(`users/${userId}/tasks`).push();
    taskRef.set(newTask)
      .then(() => {
        console.log('Task added to Realtime Database successfully');
      })
      .catch((error) => {
        console.error('Error adding task to Realtime Database: ', error);
      });
  };

  const updateTask = (taskId, updatedTask) => {
    const taskRef = database.ref(`users/${userId}/tasks/${taskId}`);
    taskRef.update(updatedTask)
      .then(() => {
        console.log('Task updated in Realtime Database successfully');
      })
      .catch((error) => {
        console.error('Error updating task in Realtime Database: ', error);
      });
  };

  const deleteTask = (taskId) => {
    const taskRef = database.ref(`users/${userId}/tasks/${taskId}`);
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
