import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useTaskContext } from '../Context/TaskContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const EditTaskForm = () => {

  const { taskId } = useParams();
  const { tasks, updateTask } = useTaskContext();
  const history = useHistory();
  const [task, setTask] = useState({});
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadLine, setDeadLine] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const foundTask = tasks.find(task => task.id === taskId);
    setTask(foundTask);
    setTaskName(foundTask.taskName);
    setDescription(foundTask.description);
    setPriority(foundTask.priority);
    setDeadLine(foundTask.deadLine);
  }, [taskId, tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      updateTask(taskId, { taskName, description, priority, deadLine });
      toast.success('Task updated successfully');
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000); 
    }
    setValidated(true);
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card className='m-md-5 mb-3'>
        <Card.Body>
          <h1>Edit Task</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                isInvalid={validated && !taskName.trim()}
              />
              <Form.Control.Feedback type="invalid">Please enter a task name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                isInvalid={validated && !description.trim()}
              />
              <Form.Control.Feedback type="invalid">Please enter a description.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                isInvalid={validated && !priority.trim()}
              >
                <option value="">Select</option>
                <option value="neutral">Neutral</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">Please select a priority.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="deadLine">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadLine"
                value={deadLine}
                onChange={(e) => setDeadLine(e.target.value)}
                required
                isInvalid={validated && !deadLine.trim()}
              />
              <Form.Control.Feedback type="invalid">Please select a deadline.</Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit">
              Update Task
            </Button>
            {" "}
              <Button as={Link}  to="/dashboard" variant="danger">
                Cancel
              </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditTaskForm;
