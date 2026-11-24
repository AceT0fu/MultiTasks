import { useEffect, useState } from "react";
import { getTasks, createTask, toggleTaskStatus, deleteTask } from "../services/taskApi";
import styles from "./TasksPage.module.css";
import type { Task } from "../types/Task";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

function TasksPage() {
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [taskToDelete, setTaskToDelete] =
  useState<Task | null>(null);

  const handleCreateTask = async (
    title: string,
    description: string
  ) => {
    await createTask(title, description);

    await loadTasks();

    setShowAddTaskModal(false);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) {
      return;
    }

    await deleteTask(taskToDelete.id);

    await loadTasks();

    setTaskToDelete(null);
  };

  const handleToggleComplete = async (
    taskId: number
  ) => {
    await toggleTaskStatus(taskId);

    await loadTasks();
  };

  const incompleteTasks = tasks.filter(
    (task) => !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Tasks</h1>

        <button
          className={styles.addButton}
          onClick={() => setShowAddTaskModal(true)}>
          +
        </button>
      </div>

      {showAddTaskModal && (
        <AddTaskModal
          onConfirm={handleCreateTask}
          onCancel={() => setShowAddTaskModal(false)}
        />
      )}

      {taskToDelete && (
        <DeleteTaskModal
          task={taskToDelete}
          onConfirm={handleDeleteTask}
          onCancel={() =>
            setTaskToDelete(null)
          }
        />
      )}

      <h2>Active Tasks</h2>

      {incompleteTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={setTaskToDelete}
        />
      ))}

      <h2>Completed Tasks</h2>

      {completedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={setTaskToDelete}
        />
      ))}
    </div>
  );
}

export default TasksPage;