import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 1. Get the base URL from the environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. Create the full endpoint URL for tasks
const TASKS_ENDPOINT = `${API_BASE_URL}/api/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    axios.get(TASKS_ENDPOINT) // Use the correct endpoint
      .then(response => {
        setTasks(response.data);
        setError(null);
      })
      .catch(() => setError('Error fetching tasks. Please try again.'));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { taskName, deadline };

    axios.post(TASKS_ENDPOINT, newTask) // Use the correct endpoint
      .then(() => {
        fetchTasks();
        setTaskName('');
        setDeadline('');
      })
      .catch(() => setError('Error adding task. Please try again.'));
  };

  const handleDelete = (id) => {
    axios.delete(`${TASKS_ENDPOINT}/${id}`) // Correctly build the delete URL
      .then(() => fetchTasks())
      .catch(() => setError('Error deleting task. Please try again.'));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString();
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>
              <span>
                {task.taskName} - Deadline: {formatDate(task.deadline)}
              </span>
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No tasks yet. Add one!</p>
        )}
      </ul>
    </div>
  );
}

export default App;