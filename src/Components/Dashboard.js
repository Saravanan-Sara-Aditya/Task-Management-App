import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Table } from 'react-bootstrap';
import { useTaskContext } from '../Context/TaskContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { tasks, deleteTask } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    toast.success("Task Deleted Successfully");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = tasks.filter(task => task.taskName.toLowerCase().includes(searchQuery.toLowerCase()));

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPriorityBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'neutral':
        return 'bg-success';
      case 'high':
        return 'bg-danger';
      case 'low':
        return 'bg-secondary';
      default:
        return '';
    }
  };

  return (
    <>
      <div className='m-md-5 ms-3 me-3 mb-3'>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
        <div className="row justify-content-end g-0">
          <h1 className="text-white">Dashboard</h1>
        </div>
        <div className='d-flex justify-content-end'>
          <Link to="/New_Task">
            <Button className='mb-3' variant='success'>
              <FontAwesomeIcon icon={faPlus} />{" "}<span className='d-none d-md-inline'>Create Task</span>
            </Button>
          </Link>
        </div>
       
        <Form.Control
        type='search'
        value={searchQuery}
        className='mb-3 shadow'
        onChange={handleSearchChange}
        placeholder="Search..."
        />
        <div class="table-responsive rounded">
          <Table className="table-bordered  shadow mb-3 scrollbar bg-white">
            <thead style={{ background: "#edf2f9" }} className='text-dark'>
              <tr>
                <th scope="col">Task ID</th>
                <th scope="col">Task Name</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col">Deadline</th>
                <th className="text-end" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No tasks available</td>
                </tr>
              ) : (
                currentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className='text-nowrap' >{task.id}</td>
                    <td className='text-nowrap' >{task.taskName}</td>
                    <td className='text-nowrap' >{task.description}</td>
                    <td className='text-nowrap' >
                      <span className={`badge ${getPriorityBadgeColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className='text-nowrap' >{task.deadLine}</td>
                    <td className="text-end">
                      <div className="dropdown font-sans-serif position-static">
                        <button className="btn overflow-hidden btn-link text-600 btn-sm dropdown-toggle btn-reveal" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-end border py-0">
                          <div className="py-2">
                            <Link className="dropdown-item" to={`/EditTask/${task.id}`}><FontAwesomeIcon icon={faPencil} /> Edit</Link>
                            <button className="overflow-hidden dropdown-item text-danger" onClick={() => handleDelete(task.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody> 
          </Table>
        </div>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link bg-white text-dark" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
      </div>
    </>
  );
};

export default Dashboard;
