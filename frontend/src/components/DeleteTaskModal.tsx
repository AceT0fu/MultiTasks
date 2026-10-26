import styles from "./DeleteTaskModal.module.css";
import type { Task } from "../types/Task";

interface DeleteTaskModalProps {
  task: Task;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteTaskModal({
  task,
  onConfirm,
  onCancel,
}: DeleteTaskModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Delete Task</h2>

        <p>
          Are you sure you want to delete:
        </p>

        <p>
          <strong>{task.title}</strong>
        </p>

        <div className={styles.actions}>
          <button onClick={onCancel}>
            Cancel
          </button>

          <button
            className={styles.deleteButton}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;