import * as UserModel from '../models/userModel.js';

export const register = async (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) return res.status(400).json({ error: "Faltan campos" });

  try {
    const user = await UserModel.createUser(nombre, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al registrar" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Login exitoso", user });
  } catch (err) {
    res.status(500).json({ error: "Error en login" });
  }
};

export const getProfile = async (req, res) => {
  // Aquí llegamos solo si el middleware de protección pasó
  res.json({ message: "Ruta protegida", user: req.user });
};