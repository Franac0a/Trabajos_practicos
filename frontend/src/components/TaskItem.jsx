import { memo, useState } from "react";

const TaskItem = memo(({ task, onDelete, onToggle, onEdit }) => {
  // Estados locales para manejar el modo edición
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, editTitle, editDescription);
    setIsEditing(false); // Salimos del modo edición
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  // Si está en modo edición, renderizamos inputs
  if (isEditing) {
    return (
      <div
        className="task-card"
        style={{ flexDirection: "column", alignItems: "stretch" }}
      >
        <input
          type="text"
          className="input-field"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="input-field"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          style={{ height: "60px", resize: "none" }}
        />
        <div
          className="task-actions"
          style={{ justifyContent: "flex-end", marginTop: "10px" }}
        >
          <button onClick={handleCancel} className="btn-secondary">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
            style={{ padding: "8px 16px" }}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    );
  }

  // Si NO está en modo edición, renderizamos el diseño normal
  return (
    <div className="task-card">
      <div className="task-info">
        <h4 className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </h4>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn-secondary"
          style={{ backgroundColor: "#2b5278" }} // Un azul sutil para diferenciarlo
        >
          Editar
        </button>
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
