import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  // New state for our form inputs
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');

  const fetchTasks = () => {
    axios.get(API_URL)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks!', error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the browser from reloading the page

    // Create a new task object from our form inputs
    const newTask = {
      taskName: taskName,
      deadline: deadline
    };

    // Send the new task to the backend API
    axios.post(API_URL, newTask)
      .then(() => {
        // After successfully adding, refresh the task list
        fetchTasks();
        // Clear the form inputs
        setTaskName('');
        setDeadline('');
      })
      .catch(error => {
        console.error('Error adding task!', error);
      });
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
          type="date" // Use a date picker for the deadline
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Display Task List */}
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>
              {task.taskName} - Deadline: {new Date(task.deadline).toLocaleDateString()}
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