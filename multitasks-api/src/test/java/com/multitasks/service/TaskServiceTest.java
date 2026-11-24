package com.multitasks.service;

import com.multitasks.dto.CreateTaskRequest;
import com.multitasks.model.Task;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Test
    void getTasks_ShouldReturnSeedData() {

        // Arrange
        TaskService taskService = new TaskService();

        // Act
        List<Task> tasks = taskService.getTasks();

        // Assert
        assertFalse(tasks.isEmpty());
    }

    @Test
    void createTask_ShouldAddTask() {

        // Arrange
        TaskService taskService = new TaskService();

        int initialCount = taskService.getTasks().size();

        CreateTaskRequest request =
                new CreateTaskRequest(
                        "Learn Testing",
                        "Write unit tests");

        // Act
        Task task = taskService.createTask(request);

        // Assert
        assertEquals(initialCount + 1, taskService.getTasks().size());
        assertEquals("Learn Testing", task.getTitle());
        assertFalse(task.isCompleted());
    }
    @Test
    void toggleTask_ShouldInvertCompletedStatus() {

        // Arrange
        TaskService taskService = new TaskService();

        Task task = taskService.getTasks().getFirst();
        boolean originalStatus = task.isCompleted();

        // Act
        taskService.toggleTaskStatus(task.getId());

        // Assert
        assertEquals(!originalStatus, task.isCompleted());
    }

    @Test
    void deleteTask_ShouldRemoveTask() {

        // Arrange
        TaskService taskService = new TaskService();

        Task task = taskService.getTasks().getFirst();
        int initialCount = taskService.getTasks().size();

        // Act
        taskService.deleteTask(
                task.getId());

        // Assert
        assertEquals(initialCount - 1, taskService.getTasks().size());
    }

    @Test
    void createTask_ShouldGenerateUniqueId() {

        // Arrange
        TaskService taskService = new TaskService();

        Long deletedId =
                taskService.getTasks()
                        .get(1)
                        .getId();

        taskService.deleteTask(deletedId);

        CreateTaskRequest request =
                new CreateTaskRequest(
                        "New Task",
                        "Description");

        // Act
        Task newTask = taskService.createTask(request);

        // Assert
        assertNotEquals(deletedId, newTask.getId());
    }

}