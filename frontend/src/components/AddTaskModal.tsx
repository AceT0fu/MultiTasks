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
        <h2>Add Task</h2>

        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => 
              setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <button onClick={handleConfirm}>
          Confirm
        </button>

        <button onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTaskModal;