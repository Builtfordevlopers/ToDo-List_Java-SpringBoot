package com.example.todolist;

import java.util.Date;

import lombok.Data;

@Data // Lombok annotation to auto-generate getters, setters, constructors, etc.
public class Task {
    private long id;
    private String taskName;
    private Date deadline;
} 