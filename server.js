require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Ruta raíz para comprobar que el servidor funciona
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
