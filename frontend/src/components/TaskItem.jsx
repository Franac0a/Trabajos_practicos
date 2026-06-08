import { memo } from "react";

const TaskItem = memo(({ task, onDelete, onToggle }) => {
  return (
    <div className="task-card">
      <div className="task-info">
        <h4 className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </h4>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task)} className="btn-secondary">
          {task.completed ? "Reabrir" : "Completar"}
        </button>
        <button onClick={() => onDelete(task.id)} className="btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
