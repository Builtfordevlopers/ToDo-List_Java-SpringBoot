import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. Create the full endpoint URL for tasks
const TASKS_ENDPOINT = `${API_BASE_URL}/api/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true); // NEW: loading state
  const [error, setError] = useState(null);     // NEW: error state

  const fetchTasks = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setTasks(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Error fetching tasks. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      taskName: taskName,
      deadline: deadline // date string "YYYY-MM-DD"
    };

    axios.post(API_URL, newTask)
      .then(() => {
        fetchTasks();
        setTaskName('');
        setDeadline('');
      })
      .catch(() => {
        setError('Error adding task. Please try again.');
      });
  };

  // NEW: Delete task function
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchTasks())
      .catch(() => setError('Error deleting task. Please try again.'));
  };

  // Function to display date nicely (avoid timezone issues)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>

      {/* Add New Task Form */}
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

      {/* Show errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <li key={task.id}>
                <span>
                  {task.taskName} - Deadline: {formatDate(task.deadline)}
                </span>
                <button
                  style={{
                    marginLeft: '10px',
                    padding: '6px 10px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
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
      )}
    </div>
  );
}

export default App;
