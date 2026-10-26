import type { Task } from "../types/Task";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDelete: (task: Task) => void;
}

function TaskCard({
  task,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
  <div>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() =>
        onToggleComplete(task.id)
      }
    />
  </div>

  <div className={styles.content}>
    <h2
      className={
        task.completed
          ? styles.completed
          : ""
      }
    >
      {task.title}
    </h2>

    {task.description && (
      <p
        className={
          task.completed
            ? styles.completed
            : ""
        }
      >
        {task.description}
      </p>
    )}
  </div>

  <button
    className={styles.deleteButton}
    onClick={() => onDelete(task)}
  >
    🗑️
  </button>
</div>

    </div>
  );
}

export default TaskCard;