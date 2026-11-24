package com.multitasks.controller;

import com.multitasks.dto.CreateTaskRequest;
import com.multitasks.model.Task;
import com.multitasks.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Get all tasks")
    @GetMapping("/api/tasks")
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

    @Operation(summary = "Create a new task")
    @PostMapping("/api/tasks")
    public Task createTask(
            @Valid @RequestBody CreateTaskRequest request) {
        return taskService.createTask(request);
    }

    @Operation(summary = "Complete/uncomplete an existing task")
    @PutMapping("/api/tasks/{id}/toggle")
    public Task toggleTaskStatus(
            @PathVariable Long id) {
        return taskService.toggleTaskStatus(id);
    }

    @Operation(summary = "Delete an existing task")
    @DeleteMapping("/api/tasks/{id}")
    public void deleteTask(
            @PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
