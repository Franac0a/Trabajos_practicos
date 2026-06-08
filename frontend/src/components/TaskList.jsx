import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
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
        className="input-field"
        placeholder="🔍 Buscar por título o descripción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
