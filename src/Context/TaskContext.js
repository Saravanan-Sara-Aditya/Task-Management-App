import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children, userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const storedTasks = localStorage.getItem(`tasks_${userId}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [userId]);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
  };

  const addTask = (task) => {
    const newTask = { id: Date.now().toString(), ...task }; 
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success('Task added successfully');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success('Task deleted successfully');
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success('Task updated successfully');
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
