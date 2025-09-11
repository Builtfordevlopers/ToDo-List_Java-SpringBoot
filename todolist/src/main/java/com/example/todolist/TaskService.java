package com.example.todolist;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service // Tells Spring that this is a service class
public class TaskService {

    // Using an in-memory list for now, like your original ArrayList.
    // AtomicLong is a thread-safe way to generate unique IDs.
    private final List<Task> taskList = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    // Method to get all tasks (replaces your displayTasks logic)
    public List<Task> getAllTasks() {
        return taskList;
    }

    // Method to add a task (replaces your addTask logic)
    public Task addTask(String taskName, Date deadline) {
        long newId = counter.incrementAndGet(); // Generate a new unique ID
        Task newTask = new Task();
        newTask.setId(newId);
        newTask.setTaskName(taskName);
        newTask.setDeadline(deadline);
        taskList.add(newTask);
        return newTask;
    }

    // Method to delete a task (replaces your deleteTask logic)
    public boolean deleteTask(long id) {
        // Remove the task if an ID match is found.
        return taskList.removeIf(task -> task.getId() == id);
    }
}