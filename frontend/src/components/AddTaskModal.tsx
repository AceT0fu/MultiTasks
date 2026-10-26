import { useState } from "react";
import styles from "./AddTaskModal.module.css";

interface AddTaskModalProps {
  onConfirm: (title: string, description: string) => void;
  onCancel: () => void;
}

function AddTaskModal({
  onConfirm,
  onCancel,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleConfirm = () => {
    if (!title.trim()) {
      return;
    }

    onConfirm(title, description);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          Add Task
        </h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Title *
          </label>

          <input
            className={styles.input}
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Description
          </label>

          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;