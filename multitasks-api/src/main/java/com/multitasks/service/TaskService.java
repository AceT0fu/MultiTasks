package com.multitasks.service;

import com.multitasks.dto.CreateTaskRequest;
import com.multitasks.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public TaskService() {
        tasks.add(new Task(nextId++, "Learn Spring Boot", "Build backend", false));
        tasks.add(new Task(nextId++, "Learn React", "Build frontend", true));
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public Task createTask(CreateTaskRequest request) {
        Task task = new Task(
            nextId++,
            request.title(),
            request.description(),
            false
        );

        tasks.add(task);
        return task;
    }

    public Task toggleTaskStatus(Long id) {
        Task task = tasks.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .orElseThrow();

        task.setCompleted(!task.isCompleted());

        return task;
    }

    public void deleteTask(Long id) {
        tasks.removeIf(t -> t.getId().equals(id));
    }
}
