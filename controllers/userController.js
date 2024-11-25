const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // <- IMPORTAR BCRYPTJS

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña antes de guardarla
    const user = await User.create({ name, email, password: hashedPassword }); // Guarda la contraseña encriptada
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Compara la contraseña encriptada
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Opcional: expira en 1 hora
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Asegúrate de obtener solo el token (después de "Bearer")
  if (!token) return res.status(401).json({ message: "Token requerido" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
};