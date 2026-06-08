import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="card-form">
      <h3>Nueva Tarea Estratégica</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Título de la tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="input-field"
          placeholder="Descripción o notas de campaña..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ height: "80px", resize: "none" }}
        />
        <button type="submit" className="btn-primary">
          Guardar Tarea
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
