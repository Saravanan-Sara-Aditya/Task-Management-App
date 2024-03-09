import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../Context/TaskContext';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskForm = () => {
  const { addTask } = useTaskContext();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadLine, setDeadLine] = useState('');
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      addTask({ taskName, description, priority, deadLine });
      toast.success('Task added successfully');

      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
    setValidated(true);
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Card className='m-md-5 ms-3 me-3 mb-3 mt-3'>
        <Card.Body>
          <h1>Create a New Task</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                isInvalid={validated && taskName.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">Task name is required.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={validated && description.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                required
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                isInvalid={validated && priority.trim() === ''}
              >
                <option value="">Select</option>
                <option value="Neutral">Neutral</option>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">Priority is required.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="deadLine">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                required
                type="date"
                value={deadLine}
                onChange={(e) => setDeadLine(e.target.value)}
                isInvalid={validated && deadLine.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">Deadline is required.</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="success">
              Add Task
            </Button>
            {' '}
              <Button as={Link} to="/" variant="danger">
                Cancel
              </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTaskForm;
