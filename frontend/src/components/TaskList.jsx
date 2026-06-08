import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [search, setSearch] = useState("");

  // Explicación para la defensa: useMemo cachea la lista filtrada.
  // Solo se recalcula si la lista de tareas cambia o el término de búsqueda se modifica.
  const filteredTasks = useMemo(() => {
    console.log("Filtrando tareas mediante useMemo...");
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(search.toLowerCase())),
    );
  }, [tasks, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Buscar por título o descripción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #444",
          background: "#222",
          color: "#fff",
        }}
      />

      {filteredTasks.length === 0 ? (
        <p style={{ color: "#777", textAlign: "center" }}>
          No se encontraron tareas organizadas.
        </p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
