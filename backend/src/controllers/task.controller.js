const Task = require("../models/Task");

// GET: Listar todo
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las tareas." });
  }
};

// GET: Obtener por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." }); // Error 404
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la tarea." });
  }
};

// POST: Crear elemento
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "El campo título es obligatorio." }); // Error 400
    }

    const newTask = await Task.create({ title, description });
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la tarea." });
  }
};

// PUT: Actualizar elemento
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ error: "El título no puede estar vacío." });
    }

    await task.update({ title, description, completed });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la tarea." });
  }
};

// DELETE: Eliminar elemento
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada correctamente." });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la tarea." });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
