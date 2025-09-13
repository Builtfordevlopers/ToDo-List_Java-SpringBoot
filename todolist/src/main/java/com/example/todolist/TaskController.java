package com.example.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired // Spring automatically provides an instance of TaskService
    private TaskService taskService;

    // GET /api/tasks  ->  Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // POST /api/tasks ->  Add a new task
    // The new task data (name, deadline) is sent in the request body as JSON
    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task.getTaskName(), task.getDeadline());
    }

    // DELETE /api/tasks/{id} -> Delete a task by its ID
    // The ID is passed as part of the URL
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable long id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.ok().build(); // Return 200 OK if successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if ID doesn't exist
        }
    }
}
