import { useState } from "react";
import styles from "./TasksPage.module.css";
import type { Task } from "../types/Task";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Learn Spring Boot",
      description: "Complete REST API tutorial",
      completed: false,
    },
    {
      id: 2,
      title: "Learn React",
      description: "Build Tasks page",
      completed: true,
    },
    {
      id: 3,
      title: "Setup PostgreSQL",
      description: "Create development database",
      completed: false,
    },
  ]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleCreateTask = (
    title: string,
    description: string
  ) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setShowAddTaskModal(false);
  };

  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null);

  const handleDeleteTask = () => {
    if (!taskToDelete) {
      return;
    }

    setTasks(
      tasks.filter(
        (task) => task.id !== taskToDelete.id
      )
    );

    setTaskToDelete(null);
  };

  const handleToggleComplete = (
    taskId: number
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(updatedTasks);
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