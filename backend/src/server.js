const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middlewares obligatorios
app.use(cors());
app.use(express.json()); // Requisito de express.json()

// Registro de rutas
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar base de datos y levantar servidor
sequelize
  .sync({ force: false }) // Cambiar a true si necesitas recrear las tablas al reiniciar
  .then(() => {
    console.log("Conexión a MySQL exitosa mediante Sequelize.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });
