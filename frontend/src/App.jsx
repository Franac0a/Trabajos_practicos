import { useEffect, useContext, useCallback } from "react";
import { TaskContext } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_BASE_URL = "http://localhost:3000/api/tasks";

function App() {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, loading, error } = state;

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("No se pudo conectar con la API.");
        const data = await response.json();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async (title, description) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Error al guardar.");
      const data = await response.json();
      dispatch({ type: "ADD_TASK", payload: data });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleToggleTask = useCallback(
    async (task) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !task.completed }),
        });
        if (!response.ok) throw new Error("Error al actualizar.");
        const data = await response.json();
        dispatch({ type: "EDIT_TASK", payload: data });
      } catch (err) {
        console.error(err.message);
      }
    },
    [dispatch],
  );

  // NUEVA FUNCIÓN: Editar texto completo
  const handleEditTask = useCallback(
    async (id, newTitle, newDescription) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
          }),
        });
        if (!response.ok) throw new Error("Error al editar.");
        const data = await response.json();
        dispatch({ type: "EDIT_TASK", payload: data });
      } catch (err) {
        console.error(err.message);
      }
    },
    [dispatch],
  );

  const handleDeleteTask = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar.");
        dispatch({ type: "DELETE_TASK", payload: id });
      } catch (err) {
        console.error(err.message);
      }
    },
    [dispatch],
  );

  if (loading)
    return (
      <div className="app-container text-center">Cargando ecosistema...</div>
    );
  if (error)
    return (
      <div className="app-container text-center" style={{ color: "#ff6b6b" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="app-container">
      <h1 className="text-center">
        Dashboard <span>Marketing</span>
      </h1>
      <TaskForm onAdd={handleAddTask} />

      {/* Pasamos la nueva función onEdit */}
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
